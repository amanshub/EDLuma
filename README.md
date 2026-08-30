# ED / LUMA — Ambient AI Wellbeing Companion

> **A companion that notices when something changes — and gives you a reason to talk.**

[![Hackathon](https://img.shields.io/badge/Hackathon-Ignition%20Hackathon%20Series-EFAB52?style=for-the-badge)](#)
[![AI](https://img.shields.io/badge/AI-Conversational%20AI-586FAF?style=for-the-badge)](#)
[![IoT](https://img.shields.io/badge/IoT-Ambient%20Sensing-539071?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-Hackathon%20Prototype-182035?style=for-the-badge)](#)

**Ed**, also called **LUMA**, is an AI + IoT ambient wellbeing companion designed to provide low-friction emotional support by combining a physical sensing device with conversational AI.

The goal isn't to diagnose people.

The goal is to **notice meaningful changes, check in gently, and help bridge moments of isolation toward human connection.**

---

## 🌐 Live Prototype

### [Try Ed / LUMA →](https://web-app-mu-black-25.vercel.app/)

---

## 💡 The Problem

Loneliness and mental-health struggles are often invisible.

Someone can be physically alone, emotionally overwhelmed, or simply having an unusually difficult day without ever opening a mental-health application or explicitly asking for help.

Most digital wellbeing systems wait for the user to initiate the interaction:

```text
User feels bad
      ↓
Opens an app
      ↓
Asks for help
      ↓
Receives support

But what happens when the person doesn't reach out?

That's the gap Ed explores.

Ed changes the interaction model.

Ambient environment
       ↓
   Ed notices
       ↓
Contextual change
       ↓
  Gentle check-in
       ↓
   Conversation
       ↓
     Support

🤖 What is Ed?

Ed is designed as a physical + digital companion.

It has two connected experiences:

🧊 1. Physical Companion

A small, pocket-sized device designed to stay around the user.

The prototype uses ambient sensors to understand simple environmental/activity signals such as:

Motion
Light
Temperature
Humidity

The physical device is intended to eventually support direct voice interaction through a microphone and speaker.

💬 2. Digital Companion

A web-based conversational interface where the user can:

Talk with Ed
Receive contextual check-ins
View ambient/behavioral insights
Get personalized suggestions
Have interest-aware conversations
Interact with Ed privately

The hardware and software are designed as one continuous companion, rather than two separate products.

🧠 Core Idea

Ed follows a simple principle:

Sense → Compare → Notice → Ask → Support

The system is not designed to conclude:

"You are depressed."

Instead, it should be able to say:

"I've noticed today seems a little different. How are you doing?"

A sensor signal is context, not a diagnosis.

The user remains the authority on how they feel.

🏗️ System Architecture
                 ┌─────────────────────┐
                 │     ED COMPANION     │
                 │                     │
                 │  ESP32-class MCU    │
                 │  PIR                │
                 │  LDR                │
                 │  DHT22              │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   LOCAL SIGNAL      │
                 │      LOGIC          │
                 │                     │
                 │ Thresholds / State  │
                 │ Event generation    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │     WEB CLIENT      │
                 │                     │
                 │ React               │
                 │ Ed Interface        │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │       BACKEND       │
                 │                     │
                 │ Express / API Proxy │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │     AI / LLM        │
                 │                     │
                 │ Conversation        │
                 │ Context             │
                 │ Personalization     │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    ED EXPERIENCE    │
                 │                     │
                 │ Check-in            │
                 │ Conversation        │
                 │ Support             │
                 └─────────────────────┘
🔧 Hardware

The current prototype explores an ESP32-class ambient sensing architecture.

Component	Purpose
ESP32-class MCU	Sensor processing and connectivity
PIR Sensor	Motion/activity detection
LDR	Ambient light detection
DHT22	Temperature & humidity
Microphone*	Future voice interaction
Speaker*	Future voice response
Compact enclosure*	Future physical Ed

* Planned/future physical integration.

Prototype Environment

The hardware sensing architecture can be developed and tested using Wokwi before moving toward physical hardware.

This allows sensor behavior and state/threshold logic to be tested rapidly during the hackathon.

💻 Software Stack
Frontend
React
Web-based Ed interface
Conversational UI
Privacy-first onboarding
Backend
Express
API proxy layer
Controlled communication between frontend and AI services
AI
Large Language Model API
Conversational reasoning
Context-aware responses
Personalization
OpenRouter fallback
Hardware / IoT
ESP32-class controller
PIR
LDR
DHT22
Wokwi simulation/prototyping
🔄 How Ed Works
1. Sense

The companion observes low-intrusion environmental/activity signals.

Motion
Light
Temperature
Humidity
2. Compare

The system can compare current conditions against an individual's expected routine.

The long-term goal is to create a personal baseline rather than assuming that everyone has the same "normal."

3. Notice

If a meaningful deviation occurs, Ed can treat it as contextual information.

For example:

Expected activity
        ↓
Unusually long inactivity
        ↓
Potential contextual change

This does not mean the person is necessarily struggling.

It simply creates a reason to check in.

4. Check In

Ed asks instead of assuming.

"I noticed things have been a little quiet today.
How are you doing?"
5. Support

Depending on the conversation, Ed can provide:

A conversation
A small healthy suggestion
Personalized encouragement
Interest-based interaction
Encouragement to connect with another person
Appropriate human/professional support when necessary
🔐 Privacy by Design

Privacy is a core part of Ed's product design.

No Camera

Ed does not require a camera or facial recognition to provide its ambient sensing concept.

Low-Intrusion Signals

The prototype focuses on signals such as:

Motion
Light
Temperature
Humidity

rather than continuously capturing visual information.

Anonymized Identity

The onboarding experience uses an anonymized codename rather than requiring the system to know the user's real-world identity.

Private Relationship

The intended relationship is:

        USER
         │
         ▼
        ED
         │
         ▼
      DEVICE

Not:

User → Public Social Network → Everyone
Future Direction

A major future goal is moving more intelligence toward the edge/device so that less unnecessary information needs to leave the user's environment.

🛡️ Safety Philosophy

Ed is not:

A therapist
A doctor
A diagnostic system
A suicide prediction system
A replacement for friends or family
A replacement for professional mental-health care

A sensor reading cannot determine someone's mental state.

A conversational AI should not make high-stakes clinical decisions autonomously.

The design principle is:

Ed can notice, ask and support.
It should not diagnose, judge or pretend to save someone alone.

If a user expresses serious risk, the appropriate direction is toward qualified human/professional and emergency support appropriate to their location.

🧪 Current Prototype Status

This project was developed under a 36-hour hackathon constraint.

The project intentionally distinguishes between what is implemented, what is prototyped/simulated, and what remains future work.

Feature	Status
Ed Web Application	✅ Implemented
React Frontend	✅ Implemented
Backend / API Layer	✅ Implemented
Conversational AI	✅ Implemented
Privacy-first onboarding	✅ Implemented
ESP32 sensing architecture	✅ Prototyped
PIR sensing	✅ Prototyped
LDR sensing	✅ Prototyped
DHT22 sensing	✅ Prototyped
Wokwi hardware simulation	✅ Prototype
Basic threshold/state logic	✅ Prototype
Multi-day behavioral baseline	🧪 Simulated / Future
Physical voice interaction	🔮 Future
Edge AI	🔮 Future
Clinical validation	🔮 Future
⚠️ Honest Prototype Boundary

A 36-hour hackathon is enough to demonstrate integration.

It is not enough to produce a clinically validated behavioral model.

Therefore, Ed does not pretend that it has already learned a real person's behavior over weeks or months.

The long-term concept is:

Days / Weeks of Consent-Based Data
                ↓
        Personal Baseline
                ↓
        Pattern Detection
                ↓
       Contextual Check-In

For the hackathon demonstration, historical behavior and triggers may be simulated where necessary to demonstrate the intended interaction.

This distinction is intentional.

We would rather underclaim and earn trust than overclaim and lose it.

🚀 Future Roadmap
Phase 1 — Prototype Stabilization
Physical Ed enclosure
Real sensor calibration
Microphone + speaker
Power management
Reliable wireless communication
Phase 2 — Personal Baseline

Collect consented longitudinal data to understand:

Daily activity patterns
Typical movement
Environmental preferences
Routine changes

The goal is personal normal, not universal normal.

Phase 3 — Edge Intelligence

Move selected processing and inference closer to the device.

Potential benefits:

Improved privacy
Lower bandwidth requirements
Reduced cloud dependency
Faster local responses
Phase 4 — Safety Evaluation

Perform structured testing for:

Unsafe AI responses
Hallucinations
Crisis conversations
False positives
Privacy leakage
Prompt manipulation
Inappropriate recommendations
Phase 5 — Human Evaluation

With appropriate ethical oversight and qualified partners:

User testing
Wellbeing research
Usability studies
Privacy/trust evaluation
Longitudinal evaluation
Phase 6 — Scale

Potential applications include:

Students living away from home
Remote workers
People living alone
Older adults
Individuals looking for a private wellbeing companion
💰 Affordability

Ed is intentionally designed around commodity hardware.

Instead of building an expensive camera-heavy smart speaker, the concept focuses on:

Low-cost MCU
     +
Simple sensors
     +
Simple enclosure
     +
AI software

The final production cost will depend on the selected MCU, audio hardware, power system, enclosure and connectivity components.

The objective is:

Accessible hardware over premium hardware.

🌍 Impact

Ed does not measure success by how human the AI sounds.

The intended impact is much simpler:

Reduce the friction between:
"I am having a difficult day"
                ↓
"I should probably talk to someone"

Ed attempts to create a bridge between those two moments.

Potential impact areas:

Loneliness
Social isolation
Everyday emotional support
Early connection
Digital wellbeing
Privacy-preserving ambient computing
💡 What Makes Ed Different?

Ed is not simply:

❌ Another chatbot

Because it can use physical/environmental context.

❌ Another IoT monitor

Because it can communicate and personalize.

❌ Another wellness application

Because it can exist physically in the user's environment.

❌ An AI therapist

Because it deliberately does not claim to diagnose or replace human care.

Instead:

Ambient sensing + personal context + conversational AI + physical presence + privacy-first design

📊 Long-Term Success Metrics

Future evaluation should focus on measurable outcomes such as:

Check-in acceptance rate
Check-in dismissal rate
False-positive intervention rate
Sensor event accuracy
Personal-baseline accuracy
User-perceived usefulness
User trust
Privacy comprehension
AI response safety
Conversation quality
User retention

Most importantly:

Does Ed actually make people feel more supported without making them feel watched?

🧑‍💻 Project Structure

A simplified representation of the project architecture:

ED-LUMA/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── ...
│
├── hardware/
│   ├── wokwi/
│   ├── sensors/
│   └── ...
│
├── docs/
│   ├── architecture/
│   └── ...
│
├── README.md
└── ...

The exact directory structure may vary depending on the deployed repository version.

⚙️ Getting Started
Prerequisites

Make sure you have:

Node.js
npm
Git
An LLM/API key configured for the backend
Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_NAME>
Install dependencies
npm install

If the frontend and backend are separated:

cd frontend
npm install

cd ../backend
npm install
Environment Variables

Create the appropriate .env file for your backend.

Example:

LLM_API_KEY=your_api_key_here
OPENROUTER_API_KEY=your_openrouter_key_here

Never commit API keys to GitHub.

Run locally
npm run dev

or run the frontend/backend according to the respective package configuration.

🌐 Live Demo

Ed / LUMA:

https://web-app-mu-black-25.vercel.app/

🎥 Hackathon Demo

The project demonstrates:

Ed's privacy-first onboarding
Conversational interaction
Ambient sensing architecture
Hardware simulation
Contextual insight concept
AI-powered conversation
Future personal-baseline architecture
🏆 Hackathon
Ignition Hackathon Series

Team: NextGen Devs
Participant: Aman Singh
Team Type: Solo Participant
Registration Code: IGN-2026-000288
Development Time: 36 hours

👤 Team
NextGen Devs
Aman Singh

Solo participant responsible for the conception, architecture, development, AI integration, IoT prototype and product direction of Ed / LUMA.

❤️ The Philosophy Behind Ed

We are not trying to solve the world's loneliness in 36 hours.

We are trying to make sure that when someone's world becomes unusually quiet, something notices.

Not to diagnose.

Not to judge.

Not to replace people.

Just to create one small opportunity for connection.

If Ed helps even one person feel less alone — that is our victory.

📚 References
World Health Organization — Suicide
https://www.who.int/publications/i/item/9789240110069
World Health Organization — Social Connection
https://www.who.int/news-room/questions-and-answers/item/social-connection
World Health Organization — Depression
https://www.who.int/en/news-room/fact-sheets/detail/depression
World Health Organization — India: Suicide
https://www.who.int/india/health-topics/suicide
