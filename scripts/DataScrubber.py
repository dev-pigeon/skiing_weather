from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, StringType, IntegerType
from pyspark.sql.functions import udf
import json


spark = SparkSession.builder \
    .appName("DataScrubber") \
    .master("local[*]") \
    .getOrCreate()


resort_schema = StructType([
    StructField("ID", IntegerType(), False), 
    StructField("Resort", StringType(), False), 
    StructField("Latitude", StringType(), False), 
    StructField("Longitude", StringType(), False), 
    StructField("Country", StringType(), False), 
    StructField("Continent", StringType(), False), 
    StructField("Price", IntegerType(), False), 
    StructField("Season", StringType(), False), 
    StructField("Highest point", IntegerType(), False), 
    StructField("Lowest point", IntegerType(), False), 
    StructField("Beginner slopes", IntegerType(), False), 
    StructField("Intermediate slopes", IntegerType(), False), 
    StructField("Difficult slopes", IntegerType(), False), 
    StructField("Total slopes", IntegerType(), False), 
    StructField("Longest run", IntegerType(), False), 
    StructField("Snow cannons", IntegerType(), False), 
    StructField("Surface lifts", IntegerType(), False), 
    StructField("Chair lifts",IntegerType(), False), 
    StructField("Gondola lifts",IntegerType(), False), 
    StructField("Total lifts",IntegerType(), False), 
    StructField("Lift capacity",IntegerType(), False), 
    StructField("Child friendly",StringType(), False), 
    StructField("Nightskiing",StringType(), False), 
    StructField("Summer skiing",StringType(), False)
])

def euro_to_dollar(euro_value):
    return euro_value * 1.03

euro_to_dollar_udf = udf(euro_to_dollar, IntegerType())



resort_df = spark.read.csv("../data/resorts.csv", header=True, schema=resort_schema)

clean_resort = resort_df.drop("Summer skiing").drop("Nightskiing").drop("Child friendly").drop("Lift capacity").drop("Snow cannons").drop("Continent")

clean_resort.show(10)

clean_resort.write.csv("../data/cleaned_resort.csv", header=True, mode="overwrite")

