---
title: FreeMesh
summary: Lets a group message each other when there's no phone signal. It runs in the phone's browser, with no SIM card and nothing to install.
detail: A battery-powered box built on the Seeed XIAO ESP32-S3 and a Semtech SX1262 LoRa radio. Each box runs its own Wi-Fi network and chat page, encrypts messages, and passes them to other boxes over 915 MHz LoRa. One button switches the same hardware between the FreeMesh firmware, Meshtastic and MeshCore.
description: FreeMesh is off-grid group chat on an ESP32-S3 and SX1262 LoRa radio. Wi-Fi hotspot with a browser chat page, text and voice clips, groups, an SOS alert, and a custom LiPo carrier board.
status: in progress
order: 1
tags: [ESP32-S3, SX1262, LoRa, ESP-IDF, KiCad]
started: 2026-10-01
updated: 2026-11-17
logo: /images/freemesh/logo.svg
alsoRuns: [Meshtastic, MeshCore]
cover: /images/freemesh/freemesh-overview.png
hero: /images/freemesh/freemesh-overview.gif
coverAlt: Two groups camping at night on either side of a mountain. Each group has a small box. A phone sends "On my way", the message travels between the boxes over LoRa radio, and it appears on the phones at the other camp.
---

FreeMesh is a small box that lets a group of people message each other where there is no cell coverage. Turn it on, join its Wi-Fi network from any phone, and open the chat page in the browser. Boxes pass the messages to each other over LoRa radio.

No SIM card, subscription or internet connection is needed, and there is nothing to install. The chat runs in the browser, so it is built for both iPhones and Android phones. Testing on more phone models is in progress.

The box also has an SOS button that sends an alert to other boxes. It is a prototype feature, so don't rely on it in an emergency.

## The chat page

The box serves one web page, and that page is the whole interface. It looks and works like a messaging app.

<figure style="display:flex;gap:12px">
  <img src="/images/freemesh/chat-page-1-home.png" alt="The Chats screen: three boxes in range, a friend request, and a chat list with Everyone, a group and two friend boxes." style="width:32%;border:1px solid #5b554c;border-radius:10px" />
  <img src="/images/freemesh/chat-page-2-everyone.png" alt="The Everyone chat: messages with the sender's name and box, a delivered mark, quick-reply buttons and a hold-to-talk button." style="width:32%;border:1px solid #5b554c;border-radius:10px" />
  <img src="/images/freemesh/chat-page-3-group.png" alt="A group chat called Family, marked as readable only by its members." style="width:32%;border:1px solid #5b554c;border-radius:10px" />
</figure>

The names and messages in these screenshots are made up.

- **Chats.** The first screen lists the boxes in range, the battery level of your box, and your chats. Everyone is the chat that all boxes on the network share.
- **Messages.** Each message shows who sent it and from which box. Your own messages show a mark when another box has received them. Quick-reply buttons send a common message, such as "On my way", in one tap.
- **Voice clips.** Hold the microphone button and talk. A clip can be up to 10 seconds long.
- **Friend boxes.** Two boxes become friends when both sides approve and both phones show the same 4-digit code. Friends get their own key for their private messages.
- **Groups.** You pick which friend boxes are in a group. Only those boxes can read it.
- **Network lock.** Give every box the same passphrase. Locked boxes encrypt every message and ignore boxes that use another passphrase.
- **Settings.** The same page sets your name, the box name, the radio settings, Bluetooth, updates and a factory reset. Your name is saved on your phone only.

The page works in light and dark mode and uses the phone's own fonts, so nothing is downloaded.

## Who it can help

- **Groups that travel together**, where coverage drops out for long stretches.
- **Camping, ski and backcountry trips**, where a group splits across several sites.
- **Families and groups of mixed ages**, since anyone who can join Wi-Fi can use it with no setup.
- **Outages**, when the cell network is down but a group still needs to talk.
- **Makers and students**, as a reference for an ESP32-S3 and SX1262 design written without a radio library.

## How it works

1. A phone joins the box's Wi-Fi network and opens the chat page.
2. The ESP32-S3 encrypts the message with AES-GCM.
3. The message goes over SPI to a Semtech SX1262 LoRa radio and out at 915 MHz.
4. Another box receives it, decrypts it, and shows it on every phone connected to that box.

Voice clips are compressed with Codec2 before they go on the air, because a LoRa link carries very little data.

## Three programs on one box

The box holds three programs: the FreeMesh firmware, Meshtastic and MeshCore. One button switches between them, so the same hardware can also join an existing Meshtastic or MeshCore network.

Meshtastic and MeshCore are separate open-source projects. This project isn't affiliated with them. Meshtastic® is a registered trademark of Meshtastic LLC.

## Hardware

| Part | Notes |
|---|---|
| Seeed XIAO ESP32-S3 + Wio-SX1262 kit | The radio board stacks on top of the XIAO |
| 915 MHz antenna | Mounted on the case |
| TP4056 charger module + LiPo cell | Charges over USB-C |
| Carrier board, 48 × 58 mm | Two-layer board that holds the XIAO, the charger, a power switch, two buttons, an LED and a buzzer |

All parts on the carrier board are through-hole, so it is designed to be soldered by hand.

## Firmware

The firmware is written in C with ESP-IDF 6.1. The SX1262 driver talks to the chip directly over SPI, following the datasheet, with no LoRa library underneath.

The code is split into one file per job (`app_radio.c`, `app_wifi.c`, `app_chat.c`, and so on), and every pin is defined in `board.h`.

The box can download a signed update by itself. If a new version fails to start, the box goes back to the version that worked.

## Design decisions

**Charger.** A power-bank module charges at about 2.1 A, which is too much for a small LiPo. A 1 A TP4056 module suits the cell and removes the need for a 5 V boost converter and a backfeed diode. That means fewer parts, lower cost and less wasted power.

**Browser instead of an app.** Stock Meshtastic pairs one phone with each device through an app. A Wi-Fi hotspot with a web page lets everyone in the group chat without installing anything. The trade-off is that a browser can't show lock-screen notifications.

## Phone app

An Android app that talks to the box over Bluetooth is in progress. It hasn't been tested on a real box yet.

## Status

This is a prototype. It isn't certified, and it isn't for sale. Radio rules differ by country, so check the rules where you are before you transmit.

The encryption hasn't had an outside security review. The carrier board is designed but not built yet, and the source code isn't published yet. Photos and range test results will be posted soon.
