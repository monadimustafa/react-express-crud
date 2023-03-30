
export default function(){
    return(
        <div>
            <form onSubmit={handleSubmit}>
                Email : <input type="email" name="email" required></input><br/>
                Password : <input type="password" name="psw"></input>
                <button type="submit" value="valider"></button>
            </form>
        </div>
    )
}