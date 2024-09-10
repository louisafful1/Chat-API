# Chat API
This project is a simple Chat API that allows users to send, retrieve, update, and delete messages. It was developed as a challenge inspired by a LinkedIn post and is designed to demonstrate core CRUD operations for a chat application.

## Features
- Send a Message: Create a new chat message with sender and recipient information.
- Get All Messages: Retrieve all chat messages in descending order of creation.
- Get a Single Message: Retrieve a specific message by its ID.
- Update a Message: Update the content of an existing message.
- Delete a Message: Remove a message by its ID


## API Endpoints
- POST /api/messages - Send a new message.
  - Request body: { "sender": "userId", "message": "Hello", "status": "sent", "recipient": "recipientId" }
- GET /api/messages - Get all messages.
- GET /api/messages/ - Get a single message by ID.
- PATCH /api/messages/ - Update a message by ID.
  - Request body: { "message": "Updated message content" }
- DELETE /api/messages/ - Delete a message by ID.
