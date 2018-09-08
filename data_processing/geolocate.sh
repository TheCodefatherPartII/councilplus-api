#/bin/bash

# Inputs:
# param1: file with one address per line
# param2: Google Maps API key
# Example: ./geolocate.sh address >> output

echo "lat,lng"
while IFS='' read -r line || [[ -n "$line" ]]; do
    curl -G -v "https://maps.googleapis.com/maps/api/geocode/json" --data-urlencode "address=${line}" --data-urlencode "key=${2}" 2>&1 | grep "lat\|lng" | head -n 2 | awk '{ print $3 }' | paste -s -
done < "$1"
