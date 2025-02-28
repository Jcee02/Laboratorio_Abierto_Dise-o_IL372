#[derive(Debug, Default)]
pub struct Code {
    code: String,
    group: Option<String>,
    suffix: Option<String>,
}

impl Code {
    pub fn new(code: String) -> Self {
        let mut code_instance = Code {
            code,
            group: None,
            suffix: None,
        };

        code_instance.set_group_and_code();
        code_instance
    }

    pub fn set_group_and_code(&mut self) {
        if self.code.len() != 5 {
            self.group = None;
            self.suffix = None;
            return;
        }

        let groups = [
            "B", "C", "U", "P00", "P01", "P02", "P03", "P04", "P05", "P06",
            "P07", "P08", "P09", "P0A", "P0B", "P0C", "P10", "P21", "P22",
            "P23", "P24", "P25", "P26", "P27", "P28", "P2A", "P2B",
        ];

        for prefix in groups.iter() {
            if let Some(suffix) = self.code.strip_prefix(prefix) {
                self.group = Some(prefix.to_string());
                self.suffix = Some(suffix.to_string());
                return;
            }
        }

        self.group = None;
        self.suffix = None;
    }
}
