import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  Button,
  Card,
  Spacer,
  Textarea,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = Array.from({ length: 101 }, (_, index) => 2000 + index);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayWithOrdinal = (day) => {
    // Assume day has most 2 digits in integer
    // i = 1 digit day(6,8), ii = 2 digit day(10,27), % remainder
    const i = day % 10, // % => if i = 3/10 = (3*3)+1, % = 1
      ii = day % 100; // % => if ii = 13/100 = (10*10)+13, % = 13
    if (i === 1 && ii !== 11) {
      return day + "st";
    }
    if (i === 2 && ii !== 12) {
      return day + "nd";
    }
    if (i === 3 && ii !== 13) {
      return day + "rd";
    } else {
      return day + "th";
    }
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [statusByMonth, setStatusByMonth] = useState({});

  useEffect(() => {
    // Clear the status when the month or year changes
    setStatusByMonth((prevStatus) => {
      const updatedStatus = { ...prevStatus };
      const key = `${selectedYear}-${selectedMonth}`;
      if (!updatedStatus[key]) {
        updatedStatus[key] = {};
      }
      return updatedStatus;
    });
  }, [selectedMonth, selectedYear]);

  const selectedStatus =
    statusByMonth[`${selectedYear}-${selectedMonth}`] || {};
  const selectedTexts =
    statusByMonth[`${selectedYear}-${selectedMonth}-texts`] || {};

  const handleStatusChange = (day, status, text) => {
    setStatusByMonth((prevStatus) => {
      const updatedStatus = { ...prevStatus };
      const key = `${selectedYear}-${selectedMonth}`;
      if (!updatedStatus[key]) {
        updatedStatus[key] = {};
      }
      updatedStatus[key][day] = status;

      const textsKey = `${selectedYear}-${selectedMonth}-texts`;
      if (!updatedStatus[textsKey]) {
        updatedStatus[textsKey] = {};
      }
      updatedStatus[textsKey][day] = text;

      return updatedStatus;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Free":
        return "success";
      case "Busy":
        return "warning";
      case "Unavailable":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <section>
      <div className="bg-gray-50 p-8 rounded-lg h-fit border-4 border-slate-500/80 hover:border-6">
        <ButtonGroup>
          {/* Left arrow button */}
          <Button
            variant="solid"
            color="success"
            size="sm"
            onClick={() => {
              const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
              setSelectedMonth(newMonth);
              if (newMonth === 11) {
                setSelectedYear((prev) =>
                  prev === years[0] ? years[years.length - 1] : prev - 1
                );
              }
            }}
          >
            ◀︎
          </Button>

          {/* Month button component  */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="solid" color="success" size="sm">
                {months[selectedMonth]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              classNames={{
                base: "max-w-xs",
                list: "max-h-[300px] overflow-scroll",
              }}
            >
              {months.map((month, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => setSelectedMonth(index)}
                >
                  {month}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Year button component */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="solid" color="success" size="sm">
                {selectedYear}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              classNames={{
                base: "max-w-xs",
                list: "max-h-[300px] overflow-scroll",
              }}
            >
              {years.map((year) => (
                <DropdownItem key={year} onClick={() => setSelectedYear(year)}>
                  {year}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Right arrow button */}
          <Button
            variant="solid"
            color="success"
            size="sm"
            onClick={() => {
              const newMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
              setSelectedMonth(newMonth);
              if (newMonth === 0) {
                setSelectedYear((prev) =>
                  prev === years[years.length - 1] ? years[0] : prev + 1
                );
              }
            }}
          >
            ▶︎
          </Button>
        </ButtonGroup>

        <Spacer />
        <Spacer />

        <div className="gap-2 grid grid-cols-7">
          {[...Array(daysInMonth(selectedMonth, selectedYear)).keys()].map(
            (day) => (
              <Card
                isFooterBlurred
                radius="lg"
                className="border-none"
                key={day}
              >
                <CardBody>
                  <p>{getDayWithOrdinal(day + 1)}</p>

                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        size="sm"
                        variant="solid"
                        color={
                          selectedStatus[day]
                            ? getStatusColor(selectedStatus[day])
                            : "default"
                        }
                        className="capitalize"
                      >
                        {selectedStatus[day] || "Status"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="solid"
                      disallowEmptySelection
                    >
                      <DropdownItem
                        color="default"
                        onClick={() => handleStatusChange(day, null)}
                      >
                        Clear Status
                      </DropdownItem>

                      <DropdownItem
                        color="success"
                        onClick={() => handleStatusChange(day, "Free")}
                      >
                        Free
                      </DropdownItem>

                      <DropdownItem
                        color="warning"
                        onClick={() => handleStatusChange(day, "Busy")}
                      >
                        Busy
                      </DropdownItem>

                      <DropdownItem
                        color="danger"
                        onClick={() => handleStatusChange(day, "Unavailable")}
                      >
                        Unavailable
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <Spacer />

                  <Textarea
                    minRows={3}
                    variant="faded"
                    value={selectedTexts[day] || ""}
                    onChange={(e) =>
                      handleStatusChange(
                        day,
                        selectedStatus[day],
                        e.target.value
                      )
                    }
                  />
                </CardBody>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
}
