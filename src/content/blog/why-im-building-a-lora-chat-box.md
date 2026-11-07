---
title: Off-grid chat for road trips with LoRa
description: Why an off-grid chat box for road trips is useful, and how it works.
date: 2026-11-06
tags: [LoRa, ESP32-S3, SX1262]
project: lora-convoy-chat
cover: /images/diagrams/lora-cars.svg
coverAlt: Two cars on a mountain road, linked by a LoRa radio arc between boxes on their dashboards. Phones in each car join the box's Wi-Fi.
---

On mountain highways, the cell signal drops out for long stretches. When a group travels in two vehicles, there is no way to coordinate stops or warn each other about the road. LoRa convoy chat solves this with one small box per vehicle. Each box makes a Wi-Fi network, phones open a chat page, and the box carries the messages to the other vehicle over LoRa.

Meshtastic already does off-grid messaging well, but each device pairs with one phone through an app. Here, the whole car shares one box with nothing to install, which is why the firmware is custom.

The SX1262 radio driver is written from the datasheet instead of using a library. That keeps the code small and easy to follow, and anyone reading it can see exactly how the chip is driven.

We're working on the radio driver and a range test on a real road. Results will be posted soon.
