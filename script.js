const { useState } = React; // Get React's tool for remembering values.
const rooms = ["All", "Living", "Dining", "Bedroom", "Office", "Storage"]; // Names for the category buttons.
const products = [ // Add or edit products in this list.
  { name: "Luna Sofa", type: "Living", photo: "photo-1555041469-a586c61ea9bc" }, // Sofa.
  { name: "Oak Dining Table", type: "Dining", photo: "photo-1617806118233-18e1de247200" }, // Dining table.
  { name: "Milo Accent Chair", type: "Living", photo: "photo-1567538096630-e0c55bd6374c" }, // Chair.
  { name: "Raven Sideboard", type: "Storage", photo: "photo-1600607687939-ce8a6c25118c" }, // Sideboard.
  { name: "Willow Lounge Chair", type: "Living", photo: "photo-1567538096630-e0c55bd6374c" }, // Lounge chair.
  { name: "Sora Bed Frame", type: "Bedroom", photo: "photo-1505693416388-ac5ce068fe85" }, // Bed.
  { name: "Arden Writing Desk", type: "Office", photo: "photo-1497366754035-f200968a6e72" }, // Desk.
  { name: "Noma Coffee Table", type: "Living", photo: "photo-1499933374294-4584851497cc" } // Coffee table.
]; // End product list.

function App() { // Main component draws the furniture store.
  const [search, setSearch] = useState(""); // Remember search text.
  const [room, setRoom] = useState("All"); // Remember selected category.
  const [name, setName] = useState(""); // Remember the feedback writer's name.
  const [comment, setComment] = useState(""); // Remember the feedback message.
  const [feedbacks, setFeedbacks] = useState([]); // Show feedback submitted on this page.
  function submitFeedback(event) { // Add the visitor's feedback to the page.
    event.preventDefault(); // Keep the form from reloading the page.
    setFeedbacks((current) => [...current, { name: name.trim(), comment: comment.trim() }]); // Add the new feedback.
    setName(""); setComment(""); // Clear the form fields.
  } // End feedback form action.
  const shownProducts = products.filter((item) => (room === "All" || item.type === room) && item.name.toLowerCase().includes(search.toLowerCase())); // Search and filter products.
  return ( // Show the store immediately.
    <> {/* Group the page without adding another visible box. */}
      <div className="announcement">Free shipping over Rs. 4,999 · 30-day easy returns</div> {/* Store offer. */}
      <header className="header"> {/* Website header. */}
        <a className="brand" href="#"><img className="brand-logo" src="assets/cosynest-mark.png" alt="CosyNest" /></a> {/* Show logo in header. */}
        <nav><a href="#store">Shop</a> <a href="#rooms">Rooms</a></nav> {/* Jump to page sections. */}
      </header> {/* End header. */}
      <section className="hero"><div className="hero-copy"><p className="eyebrow">TIMELESS DESIGN. MODERN LIVING.</p><h1>Furniture that feels like home.</h1><p>Thoughtfully made pieces for every room.</p><a className="button dark" href="#store">Shop the collection</a></div></section> {/* Welcome banner. */}
      <section className="benefits">{["Free shipping", "30-day returns", "Secure payments", "Expert support"].map((item) => <b key={item}>◇ {item}</b>)}</section> {/* Store benefits. */}
      <main className="section" id="rooms"><p className="eyebrow">SHOP BY CATEGORY</p><h2>Find furniture for every room</h2> {/* Store section. */}
        <div className="filters">{rooms.map((item) => <button className={room === item ? "selected" : ""} key={item} onClick={() => setRoom(item)}>{item}</button>)}</div> {/* Category buttons. */}
        <label className="search">Search furniture<input value={search} placeholder="Try sofa or table" onChange={(event) => setSearch(event.target.value)} /></label> {/* Search field. */}
        <div className="product-grid" id="store">{shownProducts.map((item) => <article className="product" key={item.name}> {/* Make a card for each matching product. */}
          <img src={`https://images.unsplash.com/${item.photo}?auto=format&fit=crop&w=800&q=80`} alt={item.name} /> {/* Product photo. */}
          <p className="rating">Furniture pick</p><h3>{item.name}</h3><p>Check live price and availability on Amazon.</p> {/* Preview details; Amazon provides current offers. */}
          <a className="button dark add-button" href={`https://www.amazon.in/s?k=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer">View on Amazon</a> {/* Open Amazon results for this item. */}
        </article>)}</div> {/* End product cards. */}
        {!shownProducts.length && <p>No matching furniture found.</p>} {/* Empty search message. */}
      </main> {/* End store section. */}
      <section className="feedback" id="feedback"><p className="eyebrow">YOUR THOUGHTS</p><h2>Share your feedback</h2> {/* Feedback form section. */}
        <form onSubmit={submitFeedback}><label>Your name<input required value={name} onChange={(event) => setName(event.target.value)} /></label><label>Your feedback<textarea required value={comment} onChange={(event) => setComment(event.target.value)} /></label><button className="button dark" type="submit">Send feedback</button></form> {/* Collect and submit feedback. */}
        <div className="feedback-list">{feedbacks.map((item, index) => <article key={index}><b>{item.name}</b><p>{item.comment}</p></article>)}</div> {/* Display submitted feedback. */}
      </section> {/* End feedback section. */}
      <section className="inspiration"><h2>Modern furniture. Made for real life.</h2></section> {/* Closing message. */}
      <footer>CosyNest <span>Thoughtfully made for home.</span></footer> {/* Show store tagline. */}
    </>
  ); // Finish app display.
} // End App component.

ReactDOM.createRoot(document.getElementById("root")).render(<App />); // Put the React app in the HTML root.
