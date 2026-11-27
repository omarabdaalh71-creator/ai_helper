const S="You are a friendly info assistant. Reply in the user's language and dialect (Egyptian Arabic if they write Egyptian). Cover any field. Give detailed, well organized answers with explanations, steps and examples when useful. Use markdown headings, bullets and bold. If unsure say so. For health, law and money give general info and advise seeing a professional. Emergency: tell them to call 123.";
module.exports=async(req,res)=>{
try{
const K=process.env.GEMINI_API_KEY;
const m=((req.body&&req.body.messages)||[]).slice(-10).map(x=>({role:x.role==="assistant"?"model":"user",parts:[{text:String(x.content).slice(0,2000)}]}));
let names=[];
try{const l=await(await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=100",{headers:{"x-goog-api-key":K},signal:AbortSignal.timeout(4000)})).json();
names=(l.models||[]).filter(x=>(x.supportedGenerationMethods||[]).includes("generateContent")&&/flash/.test(x.name)&&!/image|tts|live|audio|preview/.test(x.name)).map(x=>x.name);}catch(e){}
if(!names.length)names=["models/gemini-3.8-flash"];
let err="busy";
for(const n of names.slice(0,4)){
try{
const r=await fetch("https://generativelanguage.googleapis.com/v1beta/"+n+":generateContent",{method:"POST",signal:AbortSignal.timeout(9000),headers:{"Content-Type":"application/json","x-goog-api-key":K},body:JSON.stringify({systemInstruction:{parts:[{text:S}]},contents:m})});
const j=await r.json();
if(r.ok){const t=(((((j.candidates||[])[0]||{}).content||{}).parts)||[]).map(p=>p.text||"").join("");return res.status(200).json({reply:t||"?"});}
err=n+": "+((j.error&&j.error.message)||r.status);
}catch(e){err=n+": timeout";}
}
res.status(500).json({error:"Error: "+err});
}catch(e){res.status(500).json({error:"Server error"})}
};
