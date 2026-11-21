// Shared by index.html and admin.html. id = stable key used by the admin "today" list.
window.CT = (() => {
  const slug = s => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const MENU = [
    {n:"Sabudana Vada", p:"5 pcs", r:100, img:"sabudana-vada", c:["vada","fast"], tag:"Bestseller"},
    {n:"Aloo Samosa", p:"5 pcs", r:100, img:"aloo-samosa", c:["fried"], tag:"Our best seller"},
    {n:"Veg Cutlet", p:"5 pcs", r:100, img:"veg-cutlet", c:["fried"]},
    {n:"Aloo Vada", a:"Batata Vada · Aloo Bonda", p:"5 pcs", r:100, img:"aloo-bonda", c:["vada"]},
    {n:"Mirchi Vada", p:"5 pcs", r:100, img:"mirchi-vada", c:["vada"]},
    {n:"Palak Methi Bhaji Vada", p:"5 pcs", r:100, img:"palak-methi-vada", c:["vada"]},
    {n:"Moong Dal Kachori", p:"4 pcs", r:100, img:"moong-dal-kachori", c:["fried"]},
    {n:"Matar Kachori", a:"Batana Kachori", p:"4 pcs", r:100, emoji:"🫛", c:["fried"]},
    {n:"Moong Dal Mangode", p:"200 g", r:100, img:"moong-dal-mangode", c:["vada"]},
    {n:"Aloo & Onion Bhajji", p:"200 g", r:100, img:"bhajji", c:["fried"]},
    {n:"Bread Pakoda", p:"4 pcs", r:100, img:"bread-pakoda", c:["fried"]},
    {n:"Veg Cheese Paneer Sandwich", p:"4 pcs", r:100, img:"sandwich", c:["light"]},
    {n:"Vada Pav", p:"1 plate", r:100, img:"vada-pav", c:["vada"]},
    {n:"Pani Puri", a:"With khatta-meetha pani + masala", p:"20 pcs", r:100, img:"pani-puri", c:["chaat"]},
    {n:"Rava Idli", p:"1 plate", r:100, img:"rava-idli", c:["light"]},
    {n:"Rava Dhokla", p:"150 g", r:100, img:"rava-dhokla", c:["light"]},
    {n:"Sabudana Cutlet", p:"1 plate", r:100, img:"sabudana-cutlet", c:["fast"]},
    {n:"Sabudana Khichdi", p:"1 plate", r:100, img:"sabudana-khichdi", c:["fast"]},
    {n:"Khaman Dhokla", a:"150 g ₹100 · 250 g ₹150 · 500 g ₹250", p:"150 g", r:100, img:"khaman-dhokla", c:["light"], feature:1},
  ].map(d => ({...d, id: slug(d.n)}));
  const REQ = [
    {n:"Katori Chaat", s:"Crispy katori, filled fresh", img:"katori-chaat"},
    {n:"Dahi Vada", s:"Soft vadas in sweet curd", img:"dahi-vada"},
    {n:"Breakfast Salads", s:"Sprouts, veggies, paneer", img:"salad"},
    {n:"Moth Kachori", s:"Crispy, spicy moth filling", emoji:"🥟"},
    {n:"Meethe Chawal", s:"Sweet saffron rice", emoji:"🍚"},
    {n:"Sukhe Gatte ki Sabzi", s:"Rajasthani style", emoji:"🍛"},
  ];
  // India date (YYYY-MM-DD) so "today" flips at midnight IST
  const istDate = (t = Date.now()) => new Date(t + 5.5 * 3600e3).toISOString().slice(0, 10);
  const prettyDate = iso => new Date(iso + "T12:00:00+05:30").toLocaleDateString("en-IN", {weekday:"short", day:"numeric", month:"short", timeZone:"Asia/Kolkata"});
  return {MENU, REQ, istDate, prettyDate};
})();
