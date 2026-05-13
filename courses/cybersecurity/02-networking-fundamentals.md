# Networking Fundamentals for Security

Understanding how networks work is essential for both attacking and defending them.

## The OSI Model

The OSI (Open Systems Interconnection) model describes how data travels across a network in 7 layers.

| Layer | Name | Protocol Examples | Security Concerns |
|-------|------|-------------------|-------------------|
| 7 | Application | HTTP, DNS, SMTP | XSS, Injection |
| 6 | Presentation | SSL/TLS, JPEG | Weak encryption |
| 5 | Session | NetBIOS, RPC | Session hijacking |
| 4 | Transport | TCP, UDP | Port scanning |
| 3 | Network | IP, ICMP | IP spoofing |
| 2 | Data Link | Ethernet, ARP | ARP poisoning |
| 1 | Physical | Cables, WiFi | Physical access |

## TCP/IP Deep Dive

### The Three-Way Handshake

```
Client                    Server
  |  ---- SYN (seq=x) ---->  |
  |  <-- SYN-ACK (seq=y) --  |
  |  ---- ACK (seq=x+1) --->  |
  |   [Connection Established] |
```

**SYN Flood Attack**: Attacker sends thousands of SYN packets but never completes the handshake, exhausting server resources.

### Understanding Ports

```
Well-Known Ports (0-1023):
  22   → SSH
  25   → SMTP
  53   → DNS
  80   → HTTP
  443  → HTTPS
  3306 → MySQL
  5432 → PostgreSQL

Registered Ports (1024-49151): Application-specific
Dynamic Ports (49152-65535): Temporary connections
```

## Packet Analysis with Wireshark

Wireshark captures and analyzes network traffic in real time.

```
Display Filter Examples:
  http                    → All HTTP traffic
  tcp.port == 443        → HTTPS traffic
  ip.addr == 10.0.0.1    → Traffic to/from IP
  dns                    → All DNS queries
  tcp.flags.syn == 1     → SYN packets only
  http.request.method == "POST"  → POST requests
```

## DNS — The Internet's Phone Book

```bash
# Query DNS records
nslookup example.com
dig example.com

# Query specific record types
dig example.com MX   # Mail servers
dig example.com TXT  # Text records (SPF, DKIM)
dig example.com NS   # Name servers

# Reverse DNS lookup
dig -x 93.184.216.34

# Zone transfer attempt (often disabled)
dig axfr @ns1.example.com example.com
```

**DNS Cache Poisoning**: Attacker inserts malicious DNS records into a resolver's cache, redirecting users to fake sites.

## Firewalls and IDS/IPS

### Firewall Rules (iptables)

```bash
# View current rules
sudo iptables -L -n -v

# Allow established connections
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH from specific IP only
sudo iptables -A INPUT -p tcp --dport 22 -s 192.168.1.100 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j DROP

# Allow HTTP and HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Drop everything else
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP

# Save rules
sudo iptables-save > /etc/iptables/rules.v4
```

### Intrusion Detection with Snort

```
# Simple Snort rule to detect port scan
alert tcp any any -> $HOME_NET any (msg:"Port Scan Detected"; flags:S; threshold:type threshold, track by_src, count 20, seconds 5; sid:1000001;)

# Detect SQL injection attempt
alert http any any -> $HTTP_SERVERS $HTTP_PORTS (msg:"SQL Injection Attempt"; content:"' OR '"; http_uri; sid:1000002;)
```

## VPN and Encryption

```bash
# Check if traffic is encrypted (look for TLS)
wireshark filter: ssl or tls

# OpenVPN connection
sudo openvpn --config client.ovpn

# Check certificate details
openssl s_client -connect example.com:443 -showcerts
openssl x509 -in cert.pem -text -noout
```

## Practice Lab: Network Scanning

```bash
# 1. Discover hosts on your network
nmap -sn 192.168.1.0/24

# 2. Detailed scan of a specific host
nmap -sV -sC -p- 192.168.1.50

# 3. Capture traffic (requires root)
sudo tcpdump -i eth0 -w capture.pcap

# 4. Analyze with tcpdump
sudo tcpdump -r capture.pcap -n 'port 80'
```

## Key Takeaways

- Every network protocol has potential vulnerabilities
- Encryption (TLS/SSL) protects data in transit
- Firewalls are your first line of defense
- Always monitor traffic anomalies
- Never run services with more privileges than needed

**Next Lesson →** Linux Security Essentials
