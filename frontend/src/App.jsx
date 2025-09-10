import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';

const App = () => {
  const [prompt,setPrompt] = useState("");
  const [charts,setCharts] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    const fetchcharts = async() => {
      try {
        const res = await axios.get("http://localhost:3000/api/chat");
        console.log(res.data);
        setCharts(res.data);
      } catch (error) {
        console.error("Error fetching charts:", error);
      }
    };
    fetchcharts();
  },[]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!prompt.trim()) return;

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/chat",{input:prompt});
      setPrompt("");
      const res = await axios.get("http://localhost:3000/api/chat");
      setCharts(res.data);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally{
      setLoading(false);
    }
  }
  
  return (
    <div>
      {(charts.length > 0) &&  <div className='m-5 mb-30'>
      {charts.map((chart) => (
        <div key={chart._id}>
        {(chart.role == "user") &&<div className="chat chat-start mb-8">
      <div className="chat-bubble">{chart.content}</div>
      </div>}
        {(chart.role == "assistant") &&<div className="chat chat-end mb-8">
        <div className='chat-bubble'><ReactMarkdown>{chart.content}</ReactMarkdown></div>
      </div>}
      </div>
      ))}
      </div>}

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] p-4 grid grid-cols-[14fr_1fr] gap-2
                      bg-black/30 backdrop-blur-md border-t border-gray-300 mb-3 rounded-lg">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border-2 border-blue-950 p-2 rounded resize-none col-span-1"
          rows={2}
          placeholder="Type your message..."
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending" : "Send"}
          {loading && <span className="loading loading-dots loading-xl"></span>}
        </button>
      </div>
    </div>
  )
}

export default App