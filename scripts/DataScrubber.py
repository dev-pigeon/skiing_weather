from pyspark.sql import SparkSession


spark = SparkSession.builder \
    .appName("DataScrubber") \
    .master("local[*]") \
    .getOrCreate()

print("hi")