import re

def get_hours_mins_seconds(string):
    match = re.match(r'^(\d{2}:\d{2}:\d{2})', string)
    if match:
        return match.group(1).split(":")
    else:
        return None
    
def string_to_int(string):
    stripped = string.strip("0")
    return 0 if stripped == "" else int(stripped)

def get_start_time_in_seconds(start_time_string):
    hours, mins, seconds = get_hours_mins_seconds(start_time_string)
    return (string_to_int(hours) * 3600) + (string_to_int(mins) * 60) + string_to_int(seconds)

def srt_to_json(srt_content):
    json_list = []

    number_of_lines_to_extract = int (len(srt_content) / 4 )

    for i in range(number_of_lines_to_extract):
        start_time_index = (i * 4) + 1
        content_index = (i * 4) + 2

        start_time_in_seconds = get_start_time_in_seconds(srt_content[start_time_index])
        content = srt_content[content_index]

        json_list.append({
                    'start': start_time_in_seconds / 100.0,
                    'text': content,
                    "cap":"true"
                })

    return json_list


def main():
    srt_file_path = 'your-favourite-srt-file.srt'

    try:
        with open(srt_file_path, 'r', encoding='utf-8') as file:
            lines = [line.rstrip() for line in file]

        json_list = srt_to_json(lines)

        print(json_list)

    except FileNotFoundError:
        print(f"Error: File not found at {srt_file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()