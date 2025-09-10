const Model = require('./model/ChatModel');
const dotenv = require('dotenv');

dotenv.config();

const getChartHistory = async(req,res) => {
    try {
        const response = await Model.find();
        res.status(200).json(response.map((d => d.charts))[0]);
    } catch (error) {
        console.error(error);
    }
}


const ansme = async (req,res) => {
    const {input} = req.body;
    try {
        //  let chartHistory = await Model.find();
        let chartHistory = await Model.findOne();
        if (!chartHistory) {
           chartHistory = new Model({ charts: [] });
        }

        chartHistory.charts.push({role:'user',content:input});
        const recentCharts = chartHistory.charts.slice(-10);

        const response = await fetch("https://router.huggingface.co/v1/chat/completions",{
                    method:'POST',
                    headers:{
                        "Authorization":`Bearer ${process.env.HF_API_KEY}`,
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({messages:recentCharts,
                    model:"moonshotai/Kimi-K2-Instruct-0905:together",
                    })
        });

        const data = await response.json();
        const assistance = data?.choices?.[0]?.message?.content || null;
        chartHistory.charts.push({role:"assistant",content:assistance})

        await chartHistory.save();

        res.status(200).json({reply : assistance});

        console.error(error);
        res.status(500).json({message:"Internal server error"});

    } catch (error) {
        
    }
}

module.exports = {
    ansme,
    getChartHistory
}