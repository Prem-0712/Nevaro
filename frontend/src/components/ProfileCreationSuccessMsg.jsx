import successLogo from "../assets/successLogo.png";
const ProfileCreationSuccessMsg = () => {
    return (
        <>
            <section className="flex justify-center items-center h-full ">
                <div className="bg-amber-100 p-4 rounded-lg w-md flex flex-col items-center ">
                    <img src={successLogo} className="h-20 w-20" alt="successLogo" />
                    <h2 className="mb-2 text-xl font-bold text-zinc-800">Seller Profile Created Successfully</h2>
                </div>
            </section>
        </>
    )
}
export default ProfileCreationSuccessMsg;