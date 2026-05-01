from utils.decorators import log_call, retry

@log_call
@retry()
def create_ticket(incident):
    print(f"[Azure] Creating ticket for {incident.id}")
    return f"MOCK-AZURE-{incident.id}"