
export function UpdateProduct() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const unique_id = uuid();
        const small_id = unique_id.slice(0, 8);

        data.id = small_id;
        
        try {
            const response = await fetch(`http://localhost:8081/updateItem/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete');
            }

            console.log('deleted successfully');
        } 
        catch (error) {
            console.error('Error deleting:', error.message);
        }
    }};