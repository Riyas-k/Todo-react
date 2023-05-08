import React,{useState,useEffect} from "react";

 export function ErrorBoundary (props){
    const [hasError,setHasError] = useState(false);

    useEffect(()=>{
        const errorhandler =()=>
            setHasError(true);
            window.addEventListener('error',errorhandler)

            return ()=>{
                window.removeEventListener('error',errorhandler)
            }
        
    },[])
    useEffect(() => {
        const resetErrorState = () => setHasError(false);
        window.addEventListener('beforeunload', resetErrorState);
    
        return () => {
          window.removeEventListener('beforeunload', resetErrorState);
        };
      }, []);

    if(hasError){
        return <h1>Error something</h1>
    }
    return props.children
}
