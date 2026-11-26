const S="You are a friendly info assistant. Reply in the user's language and dialect (Egyptian Arabic if they write Egyptian). Cover any field. Be clear and short. If unsure say so. For health, law and money give general info and advise seeing a professional. Emergency: tell them to call 123.";
module.exports=async(req,res)=>{
try{
const m=((req.body&&req.body.messages)||[]).slice(-10).map(x=>({role:x.role==="assistant"?"model":"user",parts:[{text:String(x.content).slice(0,2000)}]}));
const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":process.env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:S}]},contents:m})});
const j=await r.json();
if(!r.ok)return res.status(500).json({error:"Error: "+((j.error&&j.error.message)||r.status)});
const t=((((j.candidates||[])[0]||{}).content||{}).parts||[]).map(p=>p.text||"").join("");
res.status(200).json({reply:t||"?"});
}catch(e){res.status(500).json({error:"Server error"})}
};
