from datetime import datetime
from utils.classifier import detect_type, detect_severity

class Incident:
    def __init__(self, id, title, description, reported_by, timestamp, assigned_team):
        self.id = id
        self.title = title
        self.description = description
        self.reported_by = reported_by
        self.timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
        self.assigned_team = assigned_team
        self._severity = None
        self.type = None
        self.ticket_ids = {}

    def classify(self):
        text = self.title + " " + self.description
        self.type = detect_type(text)
        self._severity = detect_severity(text)

    @property
    def severity(self):
        return self._severity

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "type": self.type,
            "severity": self.severity
        }

    def __lt__(self, other):
        order = {"critical": 0, "high": 1, "medium": 2, "low": 3}
        return order[self.severity] < order[other.severity]


class NetworkIncident(Incident):
    def escalate(self):
        return "Escalated to Network Team"


class AppIncident(Incident):
    def get_stack_trace(self):
        return "Stack trace data"


class SecurityIncident(Incident):
    def notify_soc(self):
        return "SOC notified"


def create_object(data):
    base = Incident(**data)
    base.classify()

    if base.type == "network":
        obj = NetworkIncident(**data)
    elif base.type == "security":
        obj = SecurityIncident(**data)
    else:
        obj = AppIncident(**data)

    obj.classify()
    return obj