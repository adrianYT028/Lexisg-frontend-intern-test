# Lexisg Frontend Intern Test

A ChatGPT-style legal assistant interface with clickable citations that open PDFs in popups, built with React and Tailwind CSS.

## Features

- **ChatGPT-style Interface**: Clean, modern chat interface with message bubbles
- **Legal Assistant Branding**: Professional Lexi branding with scales of justice icon
- **Citation Support**: Clickable citations that open PDF documents in modal popups
- **PDF Viewer**: Simulated PDF viewer with highlighted text and paragraph navigation
- **Responsive Design**: Mobile-friendly interface with smooth animations
- **Professional Styling**: Built with Tailwind CSS and shadcn/ui components

## Demo

The application simulates a motor vehicle accident case query:

**Query**: "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 of the Motor Vehicles Act, 1988?"

**Answer**: Provides a comprehensive legal response with clickable citations that open the relevant PDF document with highlighted text.

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks
- **Routing**: Wouter

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Lexisg-frontend-intern-test.git
cd Lexisg-frontend-intern-test
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## How to Use

1. **Ask a Legal Question**: Type your legal question in the chat input
2. **Get AI Response**: Receive a comprehensive answer with citations
3. **Click Citations**: Click on any citation to open the PDF document
4. **View Highlighted Text**: The PDF modal shows the relevant paragraph highlighted
5. **Download Document**: Use the download button to access the original PDF

## Citation Linking Implementation

The citation system works as follows:

1. **Citation Data Structure**: Each citation includes:
   - Citation text excerpt
   - Source document name
   - Paragraph number
   - Link to original PDF

2. **Modal PDF Viewer**: When clicked, citations open a modal that:
   - Displays simulated PDF content
   - Highlights the relevant paragraph
   - Shows document metadata
   - Provides download functionality

3. **Smooth User Experience**: 
   - Hover effects on citations
   - Keyboard navigation (ESC to close)
   - Loading states and animations

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat-interface.tsx    # Main chat component
│   │   │   ├── pdf-viewer-modal.tsx  # PDF viewer modal
│   │   │   └── ui/                   # shadcn/ui components
│   │   ├── pages/
│   │   │   └── home.tsx              # Home page
│   │   └── lib/
│   │       └── utils.ts              # Utility functions
├── server/                           # Express backend
├── shared/                           # Shared types
└── README.md
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production server

## Screenshots

[Add screenshots or screen recording of the interface here]

## Future Enhancements

- Real PDF integration using PDF.js
- Actual legal document database
- Advanced search functionality
- User authentication
- Document annotation features

## License

This project is created for the Lexi Singapore frontend intern test.

---

**Team Lexi** | Legal Research Made Simple