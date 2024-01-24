import json
from datetime import datetime
import os

test_data = None

def load_test_data():
    global test_data

    # Only load data if it hasn't been loaded yet
    if test_data is None:
        # Get the current directory of the pytest file
        current_dir = os.path.dirname(os.path.abspath(__file__))

        # Navigate up to the parent directory
        parent_dir = os.path.dirname(current_dir)

        # Navigate up again
        project_parent_dir = os.path.dirname(parent_dir)

        # Specify path to the JSON file
        json_file_path = os.path.join(project_parent_dir, 'test_data.json')

        # Load the test data from the JSON file
        with open(json_file_path) as f:
            test_data = json.load(f)

        # Parse time strings to datetime objects in the test data
        for key in ['calculateDeliveryFee', 'calculateRushHourSurcharge']:
            for test_case in test_data.get(key, []):
                test_case["time"] = parse_time(test_case["time"])

    return test_data

def parse_time(time_string):
    return datetime.strptime(time_string, "%Y-%m-%dT%H:%M:%SZ")
