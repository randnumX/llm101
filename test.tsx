import React, { useState, ChangeEvent } from 'react';
import { SDiv, SSpan } from '../../../src/core/styled'; // Adjust paths as needed
import { PxBody, PxIcon } from './path-to-components'; // Add the correct path for Px components

// Main Chatbot Component
const ChatBot = () => {
  // State variables
  const [loading, setLoading] = useState(false); // For loading state
  const [messages, setMessages] = useState([
    { sender: 'bot', text: { text: 'Hi, how can I assist you today?' }, feedback: null, comment: '' },
    { sender: 'user', text: { text: 'Tell me more about your services' }, feedback: null, comment: '' },
  ]); // Example messages
  const [commentInput, setCommentInput] = useState<{ [key: number]: string }>({}); // Manage comment input for each message

  // Handle feedback reaction
  const handleFeedback = (index: number, feedback: 'LIKE' | 'DISLIKE' | 'NEUTRAL') => {
    const newMessages = [...messages];
    newMessages[index].feedback = feedback;
    setMessages(newMessages);
  };

  // Handle comment input change
  const handleCommentChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    setCommentInput({ ...commentInput, [index]: e.target.value });
  };

  // Handle comment submission
  const handleCommentSubmit = (index: number) => {
    const newMessages = [...messages];
    newMessages[index].comment = commentInput[index];
    setMessages(newMessages);
    setCommentInput({ ...commentInput, [index]: '' }); // Clear the input after submission
  };

  return (
    <>
      {/* Chat messages */}
      <SDiv>
        {loading && <SSpan>Loading...</SSpan>}
        {messages.map((message, index: number) => (
          <SDiv
            key={index}
            className={message.sender === 'user' ? 'userMessageStyle' : 'botMessageStyle'}
          >
            <SSpan>{message?.text?.text}</SSpan>

            {/* Reactions Section */}
            <div className="options">
              <PxIcon
                className={`${message.feedback === 'LIKE' ? 'thumbs-up-filled' : 'thumbs-up'}`}
                onClick={() => handleFeedback(index, 'LIKE')}
              />
              <PxIcon
                className={`${message.feedback === 'DISLIKE' ? 'thumbs-down-filled' : 'thumbs-down'}`}
                onClick={() => handleFeedback(index, 'DISLIKE')}
              />
              <PxIcon
                className={`${message.feedback === 'NEUTRAL' ? 'neutral-filled' : 'neutral'}`}
                onClick={() => handleFeedback(index, 'NEUTRAL')}
              />
              {/* Comment Button */}
              <PxIcon className="comment-icon" onClick={() => handleCommentSubmit(index)}>
                Comment
              </PxIcon>
            </div>

            {/* Comment Section */}
            {message.comment ? (
              <SDiv className="comment-display">
                <SSpan>{message.comment}</SSpan> {/* Display the submitted comment */}
              </SDiv>
            ) : (
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={commentInput[index] || ''} // Controlled input based on state
                  onChange={(e) => handleCommentChange(index, e)}
                />
                <button onClick={() => handleCommentSubmit(index)}>Submit</button>
              </div>
            )}
          </SDiv>
        ))}
      </SDiv>
    </>
  );
};

export default ChatBot;
