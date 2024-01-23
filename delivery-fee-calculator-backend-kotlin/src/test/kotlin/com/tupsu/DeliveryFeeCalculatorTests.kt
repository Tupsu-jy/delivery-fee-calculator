package com.tupsu

import applyDeliveryFeeLimits
import calculateBulkSurcharge
import calculateDeliveryDistanceFee
import calculateDeliveryFee
import calculateItemSurcharge
import calculateRushHourSurcharge
import calculateSmallOrderSurcharge
import io.kotest.core.spec.style.FunSpec
import io.kotest.matchers.shouldBe
import java.time.LocalDateTime

class DeliveryFeeCalculatorTests : FunSpec({
    context("calculateDeliveryFee function") {
        test("should correctly calculate the total delivery fee for cart value 790, distance 2235, 4 items, and non-rush hour time") {
            val result = calculateDeliveryFee(790, 2235, 4, LocalDateTime.of(2024, 1, 15, 13, 0))
            result shouldBe 710
        }
    }

    context("calculateDeliveryDistanceFee function") {
        val testCases = mapOf(
            // Distance just below the additional fee threshold
            1499 to 300,
            // Distance exactly at the additional fee threshold
            1500 to 300,
            // Distance just above the additional fee threshold
            1501 to 400
        )
        testCases.forEach { (input, expected) ->
            test("should correctly calculate the delivery distance fee for distance $input meters") {
                calculateDeliveryDistanceFee(input) shouldBe expected
            }
        }
    }

    context("calculateSmallOrderSurcharge function") {
        // If the cart value is less than 10€, the small order surcharge is 10€ minus the cart value.
        val testCases = mapOf(
            890 to 110,
            1100 to 0,
            1000 to 0
        )
        testCases.forEach { (input, expected) ->
            test("should correctly calculate the small order surcharge for cart value $input") {
                calculateSmallOrderSurcharge(input) shouldBe expected
            }
        }
    }

    context("calculateItemSurcharge function") {
        // If the cart has more than 4 items, the item surcharge is 50 cents per item over 4.
        val testCases = mapOf(
            4 to 0,
            5 to 50,
            10 to 300,
            13 to 450
        )
        testCases.forEach { (input, expected) ->
            test("should correctly calculate the item surcharge for $input items") {
                calculateItemSurcharge(input) shouldBe expected
            }
        }
    }

    context("calculateBulkSurcharge function") {
        // If the cart has more than 12 items, the bulk surcharge is 1.20€. This is the only treshold.
        val testCases = mapOf(
            12 to 0,
            13 to 120
        )
        testCases.forEach { (input, expected) ->
            test("should correctly calculate the bulk surcharge for $input items") {
                calculateBulkSurcharge(input) shouldBe expected
            }
        }
    }

    context("calculateRushHourSurcharge function") {
        // Test cases to verify the rush hour surcharge calculations for different times and delivery fees
        // If the delivery time is between 3 PM and 7 PM on a Friday, a rush hour surcharge of 20% is applied.
        val testCases = listOf(
            Triple(LocalDateTime.of(2024, 1, 12, 15, 0), 1000, 200), // Local Friday 3 PM (start of rush hour)
            Triple(LocalDateTime.of(2024, 1, 12, 16, 0), 2000, 400), // Local Friday 4 PM (during rush hour)
            Triple(LocalDateTime.of(2024, 1, 12, 18, 0), 1500, 300), // Local Friday 6 PM (during rush hour)
            Triple(LocalDateTime.of(2024, 1, 12, 19, 0), 2000, 0),   // Local Friday 7 PM (just after rush hour)
            Triple(LocalDateTime.of(2024, 1, 13, 16, 0), 2000, 0),   // Local Saturday 4 PM (not Friday)
            Triple(LocalDateTime.of(2024, 1, 11, 14, 59), 1000, 0),  // Local Friday 2:59 PM (just before rush hour)
        )
        testCases.forEach { (time, fee, expectedSurcharge) ->
            test("should correctly calculate a rush hour surcharge of $expectedSurcharge for fee $fee at ${time.toLocalTime()}") {
                calculateRushHourSurcharge(fee, time) shouldBe expectedSurcharge
            }
        }
    }

    context("applyDeliveryFeeLimits function") {
        test("should correctly apply the delivery fee limit for fee 1600 and cart value 1500") {
            applyDeliveryFeeLimits(1600, 1500) shouldBe 1500 // Max limit
        }
        test("should correctly apply the delivery fee limit for fee 2000 and cart value 21000") {
            applyDeliveryFeeLimits(2000, 21000) shouldBe 0 // Free delivery
        }
    }
})
