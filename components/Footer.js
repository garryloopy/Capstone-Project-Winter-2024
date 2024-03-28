export default function Footer() {
  return (
    <footer className="bg-gray-800 h-32 flex justify-center items-center text-slate-50 text-md font-medium">
      <p>
        ©️ {new Date().getFullYear()}{" "}
        <span className="text-yellow-400 font-bold">Miggy's Munchies</span> All
        rights reserved.
      </p>
    </footer>
  );
}
