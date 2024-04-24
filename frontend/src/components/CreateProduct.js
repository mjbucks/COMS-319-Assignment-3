import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css"


export function CreateProduct() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const small_id = unique_id.slice(0, 8);
        data.id = small_id;
        try {
            const response = await fetch('/addItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }

            console.log('Form data submitted successfully');
        } catch (error) {
            console.error('Error submitting form data:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
                <div className="form-group">
                    <input {...register("title", { required: true})} placeholder="Title" className="form-control" />
                    {errors.title && <p className="text-danger">A valid Title is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("price", { required: true})} placeholder="Price" className="form-control" />
                    {errors.price && <p className="text-danger">A valid Price is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("description", { required: true })} placeholder="Description" className="form-control" />
                    {errors.description && <p className="text-danger">A valid Description is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("category", { required: true})} placeholder="Category" className="form-control" />
                    {errors.category && <p className="text-danger">A valid Category is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("image", { required: true })} placeholder="Image" className="form-control" />
                    {errors.image && <p className="text-danger">A valid Image is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("rate", { required: true })} placeholder="Rate" className="form-control" />
                    {errors.rate && <p className="text-danger">A valid Rate is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("count", { required: true})} placeholder="Count" className="form-control" />
                    {errors.count && <p className="text-danger">A valid count is required.</p>}
                </div>

                <div style={{ padding: "1%" }}>
                    <button type="submit" className="btn btn-secondary" style={{ backgroundColor: "#4b9ec2" }}>Submit</button>
                </div>
            </form>
        </div>);
}
