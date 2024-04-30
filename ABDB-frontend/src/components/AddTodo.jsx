import { useForm } from "react-hook-form";

async function postJew(jewData){
    const raw = JSON.stringify(jewData);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        body: raw,
        redirect: "follow",
        headers: myHeaders
    };

    fetch(`http://localhost:3000/abdb`, requestOptions)
        .then((response) => {
            if (response.ok) {
            } else {
                console.error("Failed to add content", response.statusText);
            }
        })
        .catch((error) => console.error(error));
}
export default postJew

// const AddTodo = (props) => {
//     const { onAdd = () => { } } = props; // Dekonstrukcja obiektu props, jeśli nie ma onAdd to przypisz pustą funkcję
//     // const onAdd = props.onAdd || (() => { }); // Ten sam efekt co wyżej, innym sposobem

//     const { register, handleSubmit, reset, formState: { errors } } = useForm();

//     const onSubmit = (data) => {
//         const raw = JSON.stringify(data);
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const requestOptions = {
//             method: "POST",
//             body: raw,
//             redirect: "follow",
//             headers: myHeaders
//         };

//         fetch(`${BASE_API_URL}/abdb`, requestOptions)
//             .then((response) => {
//                 if (response.ok) {
//                     reset();
//                     onAdd();
//                 } else {
//                     console.error("Failed to add todo", response.statusText);
//                 }
//             })
//             .catch((error) => console.error(error));
//     }

//     return <div>
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input {...register("title", { required: true })} />
//             {errors.title && <span>This field is required</span>}
//             <button type="submit">Add</button>
//         </form>
//     </div>
// }

// export default AddTodo;