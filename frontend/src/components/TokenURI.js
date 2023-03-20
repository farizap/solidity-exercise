import React from "react"

export function TokenURI({ getTokenURI }) {
  return (
    <div>
      <h4>TokenURI</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault()

          const formData = new FormData(event.target)
          const to = formData.get("to")

          if (to) {
            getTokenURI(to)
          }
        }}
      >
        <div className="form-group">
          <label>Token URI</label>
          <input className="form-control" type="text" name="to" required />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Get Token URI" />
        </div>
      </form>
    </div>
  )
}
