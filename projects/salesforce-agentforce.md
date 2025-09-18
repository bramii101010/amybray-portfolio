---
layout: single
title: "Salesforce Agentforce HR Prototype"
permalink: /projects/salesforce-agentforce/
header:
  overlay_image: /assets/images/salesforce-agentforce-banner.png
  overlay_filter: 0.3
---

⚡ **Overview**  
This project is a Salesforce Agentforce prototype designed for HR case management and automation. It demonstrates how Salesforce can be adapted for People Ops use cases, providing a unified platform for handling employee requests and workflows. 
---

## 🚀 Project Summary

This project showcases how I configured Salesforce Agentforce for HR case management.  
I built a prototype HR assistant (“Aunikah HR Assistant”) that:  
- Uses custom objects to track employees and HR cases  
- Handles payroll and onboarding queries through Agentforce Builder  
- Automates case routing with Salesforce Flows  
- Displays real-time insights in a Lightning dashboard  

The following sections walk through the setup with screenshots from my Salesforce Developer Org.


---

## 🏗️ Build Steps

### 1. Data Model
Created custom objects to track HR cases and employees.  
- **Employee__c** → stores employee details (Name, Email, Employment Type)  
- **HR_Case__c** → tracks HR issues (Category, Priority, Status, Resolution Notes)  

![Custom Objects]({{ site.baseurl }}/assets/images/agentforce/custom-objects.png)  

---

### 2. HR Agent (Agentforce Builder)
Built **Aunikah HR Assistant** with Agentforce Builder, configured to handle HR queries.  

![Agentforce Flow Builder]({{ site.baseurl }}/assets/images/agentforce/agentforce-flow.png)  

Sample intents:  
- “Check Payroll Status”  
- “Onboarding Checklist”  
- “Update My Contact Info”  

*(Optional close-up of one intent)*  
![Intent Sample]({{ site.baseurl }}/assets/images/agentforce/intent-sample.png)  

---

### 3. Automations (Flows)
Used **Salesforce Flow** to route and resolve cases automatically.  
- Payroll case → assigned to Payroll Specialist  
- Onboarding case → triggers checklist email  

![Flow Diagram]({{ site.baseurl }}/assets/images/agentforce/flow-diagram.png)  

---

### 4. Dashboards
Built a Lightning dashboard for HR leaders to track case volume and resolution speed.  

![HR Dashboard]({{ site.baseurl }}/assets/images/agentforce/dashboard.png)  

---

### 5. Demo Conversation
Example: Employee asks *“When will I get my paycheck?”*  
- Agent creates a Payroll Case  
- Case auto-routed to Payroll  
- Dashboard updates  

![Demo Chat]({{ site.baseurl }}/assets/images/agentforce/demo-chat.png)  

*(Optional)*  
![Case Record]({{ site.baseurl }}/assets/images/agentforce/case-record.png)  

---

## 🔑 Key Features
- AI-powered HR assistant for employee requests  
- Automated case creation and routing  
- Real-time HR dashboards  
- Scalable framework for payroll, onboarding, benefits, and compliance  

---

## 🛠 Tools Used
- Salesforce Agentforce  
- Lightning App Builder  
- Flow Automation  
