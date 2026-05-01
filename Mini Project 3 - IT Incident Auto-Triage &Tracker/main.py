import json
from models.incident import create_object
from services import servicenow, jira, azure_boards
from models.report import ReportGenerator

def main():
    with open("data/incidents.json") as f:
        data = json.load(f)

    incidents = []

    for d in data:
        inc = create_object(d)

        inc.ticket_ids['snow'] = servicenow.create_ticket(inc)
        inc.ticket_ids['jira'] = jira.create_ticket(inc)
        inc.ticket_ids['azure'] = azure_boards.create_ticket(inc)

        incidents.append(inc)

    incidents.sort()

    ReportGenerator().generate_html(incidents)

    print("Report generated successfully!")

if __name__ == "__main__":
    main()