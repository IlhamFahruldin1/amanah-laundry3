export default function Maps() {
  return (
    <div
      style={{
        width: "100%",
        background: "#ffff",
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.8342084516084!2d110.85475339999999!3d-6.790019200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70db00768381cd%3A0xc0062e77344cdeef!2sAmanah%20Laundry!5e0!3m2!1sid!2sid!4v1765231954663!5m2!1sid!2sid"
        style={{
          width: "95%",
          height: "350px",
          border: 0,
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          display: "block",
          background: "none",
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    
  );
}
