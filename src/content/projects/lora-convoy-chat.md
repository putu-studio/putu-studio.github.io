---
title: LoRa convoy chat
summary: Lets people in different cars message each other when there's no phone signal. It works on any phone, with no app or SIM card.
detail: A pair of battery-powered boxes that link two vehicles over 915 MHz LoRa radio. Each box runs its own Wi-Fi hotspot and browser chat page on an ESP32-S3, encrypts messages with AES-GCM, and drives a Semtech SX1262 through a driver written from the datasheet.
description: Off-grid car-to-car chat on an ESP32-S3 and SX1262 LoRa radio. Raw SPI driver written from the datasheet, Wi-Fi hotspot with a browser chat page, AES-GCM encryption, and a custom LiPo carrier board.
status: in progress
order: 1
tags: [ESP32-S3, SX1262, LoRa, ESP-IDF, KiCad]
started: 2026-10-01
updated: 2026-11-06
cover: /images/diagrams/lora-cars.svg
coverAlt: Two cars on a mountain road with no cell signal, linked by a LoRa radio arc between boxes on their dashboards. Phones in each car join the box's Wi-Fi.
---

## What it does

LoRa convoy chat lets people in two vehicles text each other where there is no cell coverage. Each vehicle carries one small battery-powered box. The box creates its own Wi-Fi network, and anyone in the car can join it and open a chat page in their phone's browser. Messages travel between the boxes over LoRa radio, with an expected range of about 1–4 km on the highway.

No app, SIM card, subscription or internet connection is needed. iPhones and Android phones both work, because the chat runs in the browser.

## Who it can help

- **Convoys on mountain highways**, where coverage drops out for long stretches and drivers need to coordinate stops, fuel or detours.
- **Camping, ski and backcountry trips**, where groups split across several vehicles or sites.
- **Families and groups of mixed ages**, since anyone who can join Wi-Fi can use it with no setup.
- **Emergencies and outages**, when the cell network is down but two groups still need to talk.
- **Makers and students**, as an open-source reference for an ESP32 + SX1262 design written without a radio library.

## How it works

![How a message travels from a phone in car A, through the ESP32-S3 and SX1262 radio, over LoRa, to every phone in car B](/images/diagrams/lora-flow.svg)

1. A phone joins the box's Wi-Fi network and opens the chat page.
2. The ESP32-S3 encrypts the message with AES-GCM and adds a counter so old messages can't be replayed.
3. The message goes over SPI to a Semtech SX1262 LoRa radio and out at 915 MHz.
4. The box in the other vehicle receives it, decrypts it, and shows it on every phone connected to that box.

Radio settings: 915.0 MHz, SF9, 125 kHz bandwidth, coding rate 4/5. The 902–928 MHz band is license-exempt in North and South America (ITU Region 2, for example under FCC Part 15). Other regions need a different frequency.

## Hardware

| Part | Notes |
|---|---|
| Seeed XIAO ESP32-S3 + Wio-SX1262 kit | The radio board stacks on top of the XIAO |
| 915 MHz whip antenna | Case-mounted, so no roof antenna is needed |
| TP4056 charger module + LiPo cell | 1 A charging, so the cell needs to be at least 2000 mAh |
| USB-C breakout, slide switch | Charging and power |
| 2 × 100 kΩ resistor divider | Battery level shown on the chat page |
| Custom carrier PCB + 3D-printed case | In design |

## Firmware

The firmware is written in C with ESP-IDF 6.1. The SX1262 driver talks to the chip directly over SPI, following the datasheet, with no LoRa library underneath. The driver's self-test reads the LoRa sync word register and checks for `0x14 0x24` before the app starts.

The code is split into one file per job (`app_radio.c`, `app_wifi.c`, and so on), and every pin is defined in `board.h`. That makes it easy to port to another board.

## Design decisions

**Charger.** A power-bank module charges at about 2.1 A, which is too much for a small LiPo. A 1 A TP4056 module suits the cell and removes the need for a 5 V boost converter and a backfeed diode. That means fewer parts, lower cost and less wasted power.

**Browser instead of an app.** Stock Meshtastic pairs one phone with each device through an app. A Wi-Fi hotspot with a web page lets every passenger chat with nothing to install. The trade-off is that a browser can't show lock-screen notifications.

**Frequency.** The antenna is tuned for 910–920 MHz, but public Meshtastic nodes use 906.875 MHz. The direct link uses 915 MHz.

We're working on the radio driver and a range test on a real road. Photos and results will be posted soon.
