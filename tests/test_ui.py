"""Exercise the landing-to-inspection flow without touching user records.

Run: python -m unittest discover -s tests
"""
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from streamlit.testing.v1 import AppTest
from src.pivotwatch import storage


class InspectionFlowTest(unittest.TestCase):
    def test_navigation_replay_and_saved_finding(self):
        original_path = storage.DB_PATH
        with TemporaryDirectory() as directory:
            storage.DB_PATH = Path(directory) / "inspections.sqlite3"
            try:
                app = AppTest.from_file(str(Path(__file__).resolve().parents[1] / "app.py"), default_timeout=30).run()
                self.assertFalse(app.exception)
                self.assertEqual(app.radio[0].value, "Overview")
                app.button[0].click().run()
                self.assertFalse(app.exception)
                self.assertEqual(app.radio[0].value, "Inspection desk")
                self.assertEqual(app.title[0].value, "Your field, in focus.")
                self.assertGreater(int(app.metric[0].value), 0)
                app.text_input[0].set_value("180 kPa")
                app.text_area[0].set_value("Recheck the selected zone.")
                app.button[0].click().run()
                self.assertFalse(app.exception)
                records = storage.list_inspections()
                self.assertEqual(len(records), 1)
                self.assertEqual(records[0]["measurement"], "180 kPa")
                self.assertTrue(records[0]["is_synthetic"])
                app.sidebar.selectbox[0].select_index(0).run()
                self.assertFalse(app.exception)
                self.assertEqual(int(app.metric[0].value), 0)
                app.sidebar.slider[0].set_value(100).run()
                self.assertFalse(app.exception)
                self.assertEqual(int(app.metric[0].value), 0)
                app.radio[0].set_value("Overview").run()
                self.assertFalse(app.exception)
                self.assertEqual(app.button[0].label, "Explore the inspection demo  →")
            finally:
                storage.DB_PATH = original_path


if __name__ == "__main__":
    unittest.main()
