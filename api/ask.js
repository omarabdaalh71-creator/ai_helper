const S="You are a friendly info assistant. Reply in the user's language and dialect (Egyptian Arabic if they write Egyptian). Cover any field. Be clear and short. If unsure say so. For health, law and money give general info and advise seeing a professional. Emergency: tell them to call 123.";
module.exports=async(req,res)=>{
try{
const m=((req.body&&req.body.messages)||[]).slice(-10).map(x=>({role:x.role==="assistant"?"model":"user",parts:[{text:String(x.content).slice(0,2000)}]}));
let err="busy";
for(const mod of ["gemini-3.8-flash","gemini-3.8-flash-lite","gemini-3.8-flash"]){
try{
const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/"+mod+":generateContent",{method:"POST",signal:AbortSignal.timeout(3000),headers:{"Content-Type":"application/json","x-goog-api-key":process.env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:S}]},contents:m})});
const j=await r.json();
if(r.ok){const t=(((((j.candidates||[])[0]||{}).content||{}).parts)||[]).map(p=>p.text||"").join("");return res.status(200).json({reply:t||"?"});}
err=(j.error&&j.error.message)||String(r.status);
}catch(e){err="timeout";}
}
res.status(500).json({error:"Error: "+err});
}catch(e){res.status(500).json({error:"Server error"})}
};
