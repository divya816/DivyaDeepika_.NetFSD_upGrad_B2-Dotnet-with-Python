from utils.decorators import log_call, retry

@log_call
@retry()
def create_ticket(incident):
    print(f"[Jira] Creating ticket for {incident.id}")
    return f"MOCK-JIRA-{incident.id}"