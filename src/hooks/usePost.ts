import axios, { AxiosError, AxiosStatic  } from "axios";
import { useState } from "react";


// Make a Custom hook for asynchronous actions 

type APIParams = {
    url: string;
    body?: any;
    method: 'post' | 'put' | 'get' | 'delete';
    headers? : any;
}

const usePost = () => {
    const [loading, setLoading] = useState(false);


    const PostMethod = async ({url , body , method , headers}:APIParams) => {
        setLoading(true);
        
        try {
           
            const response = await axios({
                method,
                url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
                data: body && body,
                headers : headers && headers
            });

             return response ;
       
        } catch (e) {
            const error = e as AxiosError;
     
            return error?.response
        } finally {
            setLoading(false); // Set loading to false after the request is completed
        }
    };

    return { loading, PostMethod };
};

export default usePost;
