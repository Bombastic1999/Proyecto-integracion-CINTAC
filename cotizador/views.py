import math
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import TarifaMaestra

@api_view(['POST'])
def cotizar_flete(request):
    origen = request.data.get('origen')
    peso_toneladas = float(request.data.get('peso_toneladas', 0))
    
    # REGLA DE NEGOCIO: Máximo 25 toneladas por contenedor
    LIMITE_PESO_CONTENEDOR = 25.0
    cantidad_contenedores = math.ceil(peso_toneladas / LIMITE_PESO_CONTENEDOR)
    
    try:
        tarifa = TarifaMaestra.objects.filter(puerto_origen__icontains=origen).first()
        
        if not tarifa:
            return Response({"error": "Ruta no encontrada para este origen"}, status=404)

        resultado = {
            "contenedores_requeridos": cantidad_contenedores,
            "tipo_recomendado": "High Cube (HQ)" if peso_toneladas / cantidad_contenedores < 15 else "20' o 40' Estándar",
            "dias_transito": f"{tarifa.transito_min} a {tarifa.transito_max} días",
            "costo_total_hq_usd": {
                "min": tarifa.tarifa_hq_min * cantidad_contenedores,
                "max": tarifa.tarifa_hq_max * cantidad_contenedores
            },
            "fuente": tarifa.fuente
        }
        return Response(resultado)
    except Exception as e:
        return Response({"error": str(e)}, status=500)