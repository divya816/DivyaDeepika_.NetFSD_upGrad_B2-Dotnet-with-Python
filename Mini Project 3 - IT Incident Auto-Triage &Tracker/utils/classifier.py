import re

network_pattern = re.compile(r"(tcp|udp|icmp|vlan|switch|\d+\.\d+\.\d+\.\d+)", re.I)
security_pattern = re.compile(r"(breach|ransomware|malware|phishing|unauthorized)", re.I)
app_pattern = re.compile(r"(exception|error|http-\d+|stack trace)", re.I)

critical_pattern = re.compile(r"(outage|down|breach|ransomware|production)", re.I)
high_pattern = re.compile(r"(timeout|failing|unavailable|unreachable)", re.I)
medium_pattern = re.compile(r"(slow|degraded|warning|intermittent)", re.I)

def detect_type(text):
    if network_pattern.search(text):
        return "network"
    elif security_pattern.search(text):
        return "security"
    elif app_pattern.search(text):
        return "app"
    return "general"

def detect_severity(text):
    if critical_pattern.search(text):
        return "critical"
    elif high_pattern.search(text):
        return "high"
    elif medium_pattern.search(text):
        return "medium"
    return "low"