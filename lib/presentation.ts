export const displayValue=(value:unknown)=>typeof value==='string'&&value.startsWith('str:')?value.slice(4):String(value??'');
export const resultLabel=(v:string)=>({DIRECT_COMPATIBLE:'Compatible',ADAPTER_REQUIRED:'Compatible with adapter',PARTIAL_COMPATIBILITY:'Partially compatible',CONDITIONAL:'Compatible with conditions',INCOMPATIBLE:'Not compatible',UNKNOWN:'Not enough evidence'}[v]||v);
export const evidenceLabel=(v:string)=>({SUFFICIENT:'Enough evidence',AMBIGUOUS:'Conflicting or unclear evidence',INSUFFICIENT:'Not enough evidence'}[v]||v);
export const dimensionLabel=(v:string)=>({NOT_ASSESSED:'Not checked',COMPATIBLE:'Compatible',INCOMPATIBLE:'Not compatible',CONDITIONAL:'Conditional',UNKNOWN:'Not enough evidence'}[v]||v);
