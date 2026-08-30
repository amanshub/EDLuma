#include <DHT.h>

#define PIR_PIN   2
#define LDR_PIN   34
#define DHT_PIN   4
#define LED_PIN   5
#define DHT_TYPE  DHT22

DHT dht(DHT_PIN, DHT_TYPE);

struct Baseline {
  int avgMotionEventsPerHour = 6;
  int avgLightLevel = 2000;   // ESP32 ADC is 12-bit (0-4095)
  float avgTemp = 24.0;
};
Baseline baseline;

unsigned long lastMotionTime = 0;
int motionCountThisHour = 0;
unsigned long hourStart = 0;
bool deviationActive = false;
bool simulateDeviation = false;

void setup() {
  Serial.begin(115200);
  pinMode(PIR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  dht.begin();
  hourStart = millis();
  Serial.println("LUMA sensing layer online.");
  Serial.println("Type SIMDEV in serial monitor to simulate a deviation.");
}

void checkSerialCommand() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    if (cmd == "SIMDEV") {
      simulateDeviation = true;
      Serial.println(">> Deviation simulation triggered.");
    }
  }
}

void loop() {
  checkSerialCommand();

  int motion = digitalRead(PIR_PIN);
  int light = analogRead(LDR_PIN);
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (motion == HIGH) {
    motionCountThisHour++;
    lastMotionTime = millis();
  }

  if (millis() - hourStart > 60000) {
    hourStart = millis();
    motionCountThisHour = 0;
  }

  unsigned long inactivityMs = millis() - lastMotionTime;
  bool prolongedInactivity = inactivityMs > 45000;
  bool lowLight = light < (baseline.avgLightLevel * 0.4);

  deviationActive = simulateDeviation || prolongedInactivity || lowLight;

  digitalWrite(LED_PIN, deviationActive ? HIGH : LOW);

  Serial.print("{\"motion\":"); Serial.print(motion);
  Serial.print(",\"light\":"); Serial.print(light);
  Serial.print(",\"temp\":"); Serial.print(temp);
  Serial.print(",\"humidity\":"); Serial.print(humidity);
  Serial.print(",\"deviation\":"); Serial.print(deviationActive ? "true" : "false");
  Serial.println("}");

  simulateDeviation = false;
  delay(2000);
}