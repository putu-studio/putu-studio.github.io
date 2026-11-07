---
title: AI pin
summary: A small clip-on assistant for hands-free questions, built on a custom circuit board.
detail: A wearable built on the XIAO ESP32-S3 Sense, using its on-board microphone, with a custom two-layer KiCad carrier PCB for TP4056 LiPo charging, USB-C power with TVS protection, battery sensing, a power switch and buttons. Fabricated and assembled by JLCPCB.
description: Wearable AI pin on a XIAO ESP32-S3 Sense with a custom KiCad carrier PCB (TP4056 LiPo charger, USB-C, TVS protection, battery sensing), made by JLCPCB.
status: in progress
order: 2
repo: https://github.com/putu-studio/AI_Pin
hardware: https://github.com/putu-studio/AI_Pin/tree/main/hardware
tags: [ESP32-S3 Sense, KiCad, PCB, TP4056, JLCPCB]
started: 2026-08-01
updated: 2026-10-15
---

## What it does

The AI pin is a small wearable built around the Seeed XIAO ESP32-S3 Sense, which records your voice with its on-board microphone. The Sense board also has a camera, but this project doesn't use it. A custom carrier PCB adds what a wearable needs to run on its own: a LiPo charger, a battery, a power switch and buttons. The firmware connects over Wi-Fi to an AI service.

## Who it can help

- **Hands-free use**, for asking a question or capturing a note while your hands are busy.
- **Accessibility**, as a starting point for voice-driven help that doesn't need a phone in hand.
- **Makers and students**, as an open reference for a small battery-powered ESP32-S3 wearable: charging, USB-C and power path on a two-layer board that's cheap to order.

## The board

The board was drawn in KiCad. The repository includes the Gerbers, BOM and pick-and-place files, so you can order it ready-assembled from JLCPCB or another PCB maker.

- TP4056 charger with a 2.4 kΩ program resistor, which sets about 500 mA to suit the 1100 mAh LiPo.
- A USB-C port with the 5.1 kΩ CC resistors (without them, many USB-C chargers won't supply power), plus a TVS diode on VBUS.
- The power path runs battery → charger → slide switch → the rest of the board.

![Power path: USB-C into the TP4056 charger, which charges the LiPo. The battery feeds the XIAO through a switch, and a divider reports battery level to the ADC.](/images/diagrams/ai-pin-power.svg)

- A resistor divider lets the ESP32 measure the battery.

The firmware is split into one file per job: Wi-Fi, display, relay and microphone.

Photos and a demo will be posted soon.
