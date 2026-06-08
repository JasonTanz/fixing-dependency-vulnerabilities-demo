import express from "express"
import _ from "lodash"
import minimist from "minimist"

const app = express()

export function normalizePartnerName(name) {
  return _.kebabCase(name)
}

export function parseFeatureFlags(argv) {
  return minimist(argv)
}

app.get("/", (_req, res) => {
  res.json({
    workshop: "Turning Repetitive Work into Skills",
    example: normalizePartnerName("Auto Insurance Partner")
  })
})

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Workshop app listening on http://localhost:3000")
  })
}
