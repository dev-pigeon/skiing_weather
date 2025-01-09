import csv
import json

def create_json_entry(
    ID, Resort, Latitude, Longitude, Country, Continent, Price, Season,
    highest_point, lowest_point, beginner_slopes, intermediate_slopes,
    difficult_slopes, total_slopes, longest_run, snow_cannons, surface_lifts,
    chair_lifts, gondola_lifts, total_lifts, lift_capacity, child_friendly,
    snowparks, nightskiing, summer_skiing
):
    entry = {
            "ID": ID,
            "Resort": Resort,
            "Country": Country,
            "Continent": Continent,
            "Price": Price,
            "Season": Season,
            "Highest point": highest_point,
            "Lowest point": lowest_point,
            "Beginner slopes": beginner_slopes,
            "Intermediate slopes": intermediate_slopes,
            "Difficult slopes": difficult_slopes,
            "Total slopes": total_slopes,
            "Longest run": longest_run,
            "Snow cannons": snow_cannons,
            "Surface lifts": surface_lifts,
            "Chair lifts": chair_lifts,
            "Gondola lifts": gondola_lifts,
            "Total lifts": total_lifts,
            "Lift capacity": lift_capacity,
            "Child friendly": child_friendly,
            "Snowparks": snowparks,
            "Nightskiing": nightskiing,
            "Summer skiing": summer_skiing,
            "coordinates": [Longitude, Latitude]    
    }
    return entry

def convert_csv_to_json(csv_file_path, json_file_path):
    with open(csv_file_path, mode='r', encoding='utf-8-sig', errors='replace') as csv_file, open(json_file_path, mode='w', encoding='utf-8') as json_file:
        csv_reader = csv.reader(csv_file)
        header = next(csv_reader)  # Read the header row
        json_entries = []

        for row in csv_reader:
            line = row
            entry = create_json_entry(
                line[0], line[1], line[2], line[3], line[4], line[5], line[6], line[7],
                line[8], line[9], line[10], line[11], line[12], line[13], line[14],
                line[15], line[16], line[17], line[18], line[19], line[20], line[21],
                line[22], line[23], line[24]
            )
            json_entries.append(entry)
        json.dump(json_entries, json_file, indent=4)


    
input_csv = "../data/clean_resorts.csv"     
output_json = "../data/resorts.json" 
convert_csv_to_json(input_csv, output_json)
print(f"CSV data has been successfully converted to JSON and saved in '{output_json}'.")
