import bg_image from "/public/background.png";

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url(${bg_image})`,
          backgroundPosition: "right center",
          backgroundSize: "cover",
        }}
      />
      {/* Градиентная маска для лучшей читаемости */}
      <div className={"absolute inset-0"} />
    </div>
  );
}

export default Background;
