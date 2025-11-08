mod obd;

fn main() {
    let code = obd::Code::new("P2BA8".to_string());

    println!("{:#?}", code);
}
