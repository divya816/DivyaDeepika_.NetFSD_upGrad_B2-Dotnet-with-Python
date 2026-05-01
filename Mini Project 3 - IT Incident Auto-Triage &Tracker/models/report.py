class ReportGenerator:
    def generate_html(self, incidents):
        from collections import Counter
        from datetime import datetime
        import os

        type_count = Counter(i.type for i in incidents)
        severity_count = Counter(i.severity for i in incidents)
        team_count = Counter(i.assigned_team for i in incidents)

        total_incidents = len(incidents)
        critical_count = severity_count.get("critical", 0)
        high_count = severity_count.get("high", 0)
        medium_count = severity_count.get("medium", 0)
        low_count = severity_count.get("low", 0)

        def badge(text, cls):
            return f'<span class="badge {cls}">{text}</span>'

        def safe(val):
            return val if val else "N/A"

        html = f"""
        <html>
        <head>
        <title>IT Incident Auto-Triage Report</title>
        <style>
            body {{
                font-family: 'Segoe UI', Arial;
                background: #f4f6f9;
                margin: 0;
                padding: 0;
                color: #212529;
            }}

            .container {{
                width: 95%;
                margin: auto;
                padding: 20px;
            }}

            .header {{
                background: linear-gradient(90deg, #0f172a, #1e293b);
                color: white;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            }}

            .header h1 {{
                margin: 0;
                font-size: 28px;
            }}

            .header p {{
                margin: 5px 0 0;
                font-size: 14px;
                opacity: 0.9;
            }}

            .summary {{
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-bottom: 25px;
            }}

            .summary-box {{
                background: white;
                padding: 20px;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 4px 10px rgba(0,0,0,0.08);
            }}

            .summary-box h2 {{
                margin: 0;
                font-size: 24px;
                color: #0f172a;
            }}

            .summary-box p {{
                margin: 5px 0 0;
                font-size: 13px;
                color: #6c757d;
            }}

            .section-title {{
                margin: 20px 0 10px;
                font-size: 20px;
                color: #0f172a;
                font-weight: 600;
            }}

            .card {{
                background: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 3px 8px rgba(0,0,0,0.08);
                margin-bottom: 20px;
            }}

            /* BADGES */
            .badge {{
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                margin: 3px;
                display: inline-block;
                font-weight: 600;
            }}

            /* TYPE COLORS */
            .network {{ background: #e7f5ff; color:#1864ab; }}
            .security {{ background: #fff5f5; color:#c92a2a; }}
            .app {{ background: #ebfbee; color:#2b8a3e; }}
            .general {{ background: #f1f3f5; color:#495057; }}

            /* SEVERITY COLORS */
            .critical {{ background: #ffe3e3; color:#c92a2a; border:1px solid #ffa8a8; }}
            .high {{ background: #fff4e6; color:#d9480f; border:1px solid #ffc078; }}
            .medium {{ background: #fff9db; color:#e67700; border:1px solid #ffe066; }}
            .low {{ background: #ebfbee; color:#2b8a3e; border:1px solid #b2f2bb; }}

            table {{
                width: 100%;
                border-collapse: collapse;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 3px 10px rgba(0,0,0,0.08);
            }}

            th {{
                background: #1e293b;
                color: white;
                padding: 12px;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }}

            td {{
                padding: 10px;
                text-align: center;
                font-size: 13px;
            }}

            tr:nth-child(even) {{
                background: #f8f9fa;
            }}

            tr:hover {{
                background: #edf2f7;
            }}

            .ticket {{
                display: inline-block;
                background: #edf2ff;
                color: #364fc7;
                padding: 4px 8px;
                border-radius: 6px;
                margin: 2px;
                font-size: 11px;
                font-weight: 500;
            }}

            footer {{
                text-align: center;
                margin-top: 30px;
                font-size: 12px;
                color: #868e96;
            }}
        </style>
        </head>

        <body>
        <div class="container">

        <div class="header">
            <h1>IT Incident Auto-Triage Dashboard</h1>
            <p>Generated on {datetime.now().strftime('%Y-%m-%d %H:%M')} | Total Incidents: {total_incidents}</p>
        </div>

        <div class="summary">
            <div class="summary-box"><h2>{total_incidents}</h2><p>Total</p></div>
            <div class="summary-box"><h2>{critical_count}</h2><p>Critical</p></div>
            <div class="summary-box"><h2>{high_count}</h2><p>High</p></div>
            <div class="summary-box"><h2>{medium_count}</h2><p>Medium</p></div>
            <div class="summary-box"><h2>{low_count}</h2><p>Low</p></div>
        </div>

        <div class="section-title">Incident Type Distribution</div>
        <div class="card">
            {''.join([badge(f"{k.upper()}: {v}", k) for k,v in type_count.items()])}
        </div>

        <div class="section-title">Severity Distribution</div>
        <div class="card">
            {''.join([badge(f"{k.upper()}: {v}", k) for k,v in severity_count.items()])}
        </div>

        <div class="section-title">Team Distribution</div>
        <div class="card">
            {''.join([badge(f"{k}: {v}", "general") for k,v in team_count.items()])}
        </div>

        <div class="section-title">Incident Details</div>

        <table>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Severity</th>
            <th>Type</th>
            <th>Team</th>
            <th>Timestamp</th>
            <th>Tickets</th>
        </tr>
        """

        for inc in incidents:
            html += f"""
            <tr>
                <td>{inc.id}</td>
                <td>{inc.title}</td>
                <td>{badge(inc.severity.upper(), inc.severity)}</td>
                <td>{badge(inc.type.upper(), inc.type)}</td>
                <td>{inc.assigned_team}</td>
                <td>{inc.timestamp.strftime('%Y-%m-%d %H:%M')}</td>
                <td>
                    <span class="ticket">SNOW: {safe(inc.ticket_ids.get('snow'))}</span>
                    <span class="ticket">JIRA: {safe(inc.ticket_ids.get('jira'))}</span>
                    <span class="ticket">AZURE: {safe(inc.ticket_ids.get('azure'))}</span>
                </td>
            </tr>
            """

        html += """
        </table>

        <footer>
            Generated by IT Incident Auto-Triage System
        </footer>

        </div>
        </body>
        </html>
        """

        os.makedirs("output", exist_ok=True)

        with open("output/report.html", "w", encoding="utf-8") as f:
            f.write(html)