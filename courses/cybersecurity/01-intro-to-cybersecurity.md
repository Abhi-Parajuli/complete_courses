# Introduction to Cybersecurity

Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks, theft, and damage.

## Why Cybersecurity Matters

> "There are only two types of companies: those that have been hacked and those that will be." — John Chambers

Every day, billions of records are exposed through data breaches. Understanding cybersecurity is no longer optional — it's essential.

## Core Security Concepts

### The CIA Triad

The foundation of information security:

| Principle | Meaning | Example |
|-----------|---------|---------|
| **Confidentiality** | Only authorized access | Encryption, access control |
| **Integrity** | Data is accurate & unaltered | Checksums, digital signatures |
| **Availability** | Systems are accessible | Redundancy, backups |

### Types of Threats

**Malware**
- Viruses — self-replicating code
- Ransomware — encrypts files for ransom
- Spyware — silently collects data
- Trojans — disguised as legitimate software

**Network Attacks**
- Man-in-the-Middle (MitM)
- Denial of Service (DoS/DDoS)
- Packet sniffing
- ARP spoofing

**Social Engineering**
- Phishing emails
- Pretexting
- Baiting
- Vishing (voice phishing)

## Defense Strategies

### 1. Defense in Depth
Multiple layers of security controls — no single point of failure.

```
Internet → Firewall → IDS/IPS → DMZ → Internal Firewall → Servers
```

### 2. Principle of Least Privilege
Users and systems should only have the minimum permissions needed.

```bash
# BAD: Running a web server as root
sudo nginx

# GOOD: Running as a dedicated low-privilege user
useradd -r -s /bin/false www-data
sudo -u www-data nginx
```

### 3. Zero Trust Architecture
"Never trust, always verify." Assume breach by default.

## Common Vulnerabilities

### OWASP Top 10 (Web Apps)
1. Broken Access Control
2. Cryptographic Failures
3. Injection (SQL, XSS, etc.)
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Integrity Failures
9. Logging Failures
10. SSRF

### SQL Injection Example

```python
# VULNERABLE CODE — Never do this!
query = "SELECT * FROM users WHERE username='" + user_input + "'"

# Attack: user_input = "' OR '1'='1"
# Result: SELECT * FROM users WHERE username='' OR '1'='1'
# This returns ALL users!

# SAFE CODE — Use parameterized queries
cursor.execute("SELECT * FROM users WHERE username = %s", (user_input,))
```

## Your First Security Tool: Nmap

Nmap is a network scanner used for security auditing.

```bash
# Basic host scan
nmap 192.168.1.1

# Scan a range
nmap 192.168.1.1-254

# Detect OS and services
nmap -A -T4 target.com

# Scan specific ports
nmap -p 22,80,443 target.com

# Output to file
nmap -oN scan_results.txt target.com
```

> ⚠️ **Ethics Note**: Only scan networks and systems you own or have explicit written permission to test. Unauthorized scanning is illegal in most jurisdictions.

## Career Paths in Cybersecurity

- **Penetration Tester** — Ethical hacker who finds vulnerabilities
- **SOC Analyst** — Monitors and responds to security incidents
- **Security Engineer** — Builds and maintains security systems
- **Malware Analyst** — Reverse engineers malicious software
- **Forensics Investigator** — Analyzes digital evidence

## Summary

Cybersecurity is a vast and rapidly evolving field. In this course, you'll build a strong foundation in both offensive and defensive security techniques.

**Next Lesson →** Networking Fundamentals
