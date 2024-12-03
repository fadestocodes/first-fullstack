import { z } from 'zod';
import { useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"

const signupSchema = z.object({
  firstName: z.string().min(3, {message : "First name must be at least 3 characters long"}),
  lastName: z.string().min(3, {message : "Last name must be at least 3 characters long"}),
  email: z.string().email({message:"Please enter a valid email address"}),
  password: z.string().min(6, {message:"Password must be at least 6 characters long"}),
});

const ZodSignupForm = ()=> {

    const navigate = useNavigate();
    const form = useForm({
        resolver : zodResolver(signupSchema),
        defaultValues : {
            firstName : '',
            lastName : '',
            email : '',
            password : '',
        }
    })
    async function onSubmit(values){
        console.log(values);
        try {
                        const response = await fetch ('http://localhost:3000/sign-up', {
                            method : 'POST',
                            headers : {
                                'Content-Type' : 'application/json'
                            },
                            body : JSON.stringify(values)
                        });
                        const data = await response.json();
            
                        if (response.ok){
                            navigate('/');
                            console.log("Success", data.message);
                        } else {
                            console.log('Bad response')
                        }
                        
                    } catch (err) {
                        console.error(err);
                    }
    }

    const formState = form.formState;
    useEffect(()=> {
        if (formState.isSubmitSuccessful){
            console.log('form submitted succesuflly');
        } else if (formState.errors){
            console.log('Validation Errors ', formState.errors);
        }
    }, [formState]);


    return(
        <>
        <div><h1>Signup</h1></div>
        <div className='flex w-full items-center flex-col '>
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@gmail.com' {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input  {...field} type='password' />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
                  </form>
                </Form>
        </div>
        </>

    )
}

export default ZodSignupForm;






// const onSubmit =  async (data : any) => {
//     // event.preventDefault();
//         try {
//             const response = await fetch ('http://localhost:3000/sign-up', {
//                 method : 'POST',
//                 headers : {
//                     'Content-Type' : 'application/json'
//                 },
//                 body : JSON.stringify(data)
//             });
//             const data = await response.json();

//             if (response.ok){
//                 navigate('/');
//                 console.log("Success", data.message);
//             } else {
//                 console.error('Data is: ', data);
//                 console.error('Data Error is: ', data.error);
//                 setErrors( prevErrors => ({
//                     ...prevErrors,
//                     serverErrors : [ data.error]
//                 }) );
//             }
            
//         } catch (err) {
//             console.error(err);
//         }
 
//     }
