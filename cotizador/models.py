from django.db import models

class TarifaMaestra(models.Model):
    puerto_origen = models.CharField(max_length=100)
    pais_origen = models.CharField(max_length=100)
    puerto_destino = models.CharField(max_length=100, default='Valparaíso')
    tipo_ruta = models.CharField(max_length=50, null=True, blank=True)
    tarifa_20_min = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa_20_max = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa_40_min = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa_40_max = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa_hq_min = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa_hq_max = models.DecimalField(max_digits=10, decimal_places=2)
    transito_min = models.IntegerField()
    transito_max = models.IntegerField()
    fuente = models.CharField(max_length=255, null=True, blank=True)
    
    class Meta:
        db_table = 'tarifas_maestras'