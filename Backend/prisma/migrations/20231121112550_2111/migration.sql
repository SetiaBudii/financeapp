-- CreateTable
CREATE TABLE "income" (
    "id_income" SERIAL NOT NULL,
    "amount" INTEGER,
    "time_stamp" DATE,
    "id_wallet" INTEGER,

    CONSTRAINT "income_pkey" PRIMARY KEY ("id_income")
);

-- CreateTable
CREATE TABLE "kategori" (
    "nama_kategori" VARCHAR(32),
    "id_kategori" SERIAL NOT NULL,
    "budget" INTEGER,
    "username" VARCHAR(32),

    CONSTRAINT "pk_kategori" PRIMARY KEY ("id_kategori")
);

-- CreateTable
CREATE TABLE "outcome" (
    "id_outcome" SERIAL NOT NULL,
    "amount" INTEGER,
    "time_stamp" DATE,
    "id_wallet" INTEGER,
    "id_kategori" INTEGER,

    CONSTRAINT "outcome_pkey" PRIMARY KEY ("id_outcome")
);

-- CreateTable
CREATE TABLE "tipe_wallet" (
    "tipe" VARCHAR(16) NOT NULL,

    CONSTRAINT "tipe_wallet_pkey" PRIMARY KEY ("tipe")
);

-- CreateTable
CREATE TABLE "users" (
    "username" VARCHAR(32) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "wallet" (
    "username" VARCHAR(32),
    "saldo" INTEGER NOT NULL,
    "id_wallet" SERIAL NOT NULL,
    "tipe" VARCHAR(16),

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id_wallet")
);

-- CreateIndex
CREATE INDEX "fki_income_id_wallet_fkey" ON "income"("id_wallet");

-- CreateIndex
CREATE INDEX "fki_f_username" ON "kategori"("username");

-- CreateIndex
CREATE INDEX "fki_outcome_id_kategori_fkey" ON "outcome"("id_kategori");

-- CreateIndex
CREATE INDEX "fki_outcome_id_wallet_fkey" ON "outcome"("id_wallet");

-- CreateIndex
CREATE INDEX "fki_wallet_tipe_fkey" ON "wallet"("tipe");

-- CreateIndex
CREATE INDEX "fki_wallet_username_fkey" ON "wallet"("username");

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_id_wallet_fkey" FOREIGN KEY ("id_wallet") REFERENCES "wallet"("id_wallet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kategori" ADD CONSTRAINT "fk_username" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_id_kategori_fkey" FOREIGN KEY ("id_kategori") REFERENCES "kategori"("id_kategori") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_id_wallet_fkey" FOREIGN KEY ("id_wallet") REFERENCES "wallet"("id_wallet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_tipe_fkey" FOREIGN KEY ("tipe") REFERENCES "tipe_wallet"("tipe") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE OR REPLACE FUNCTION increase_wallet_saldo()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE wallet
    SET saldo = saldo + NEW.amount
    WHERE id_wallet = NEW.id_wallet;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increase_wallet_saldo_trigger
AFTER INSERT ON income
FOR EACH ROW
EXECUTE FUNCTION increase_wallet_saldo();


CREATE OR REPLACE FUNCTION decrease_wallet_saldo()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE wallet
    SET saldo = saldo - NEW.amount
    WHERE id_wallet = NEW.id_wallet;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrease_wallet_saldo_trigger
AFTER INSERT ON outcome
FOR EACH ROW
EXECUTE FUNCTION decrease_wallet_saldo();

CREATE OR REPLACE FUNCTION update_wallet_saldo_on_outcome_delete()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the wallet saldo before the outcome record is deleted
    UPDATE wallet
    SET saldo = saldo + OLD.amount
    WHERE id_wallet = OLD.id_wallet;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wallet_saldo_on_outcome_delete_trigger
BEFORE DELETE ON outcome
FOR EACH ROW
EXECUTE FUNCTION update_wallet_saldo_on_outcome_delete();

-- Create a trigger function for updating wallet saldo
CREATE OR REPLACE FUNCTION update_wallet_saldo_on_income_delete()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the wallet saldo before the income record is deleted
    UPDATE wallet
    SET saldo = saldo - OLD.amount
    WHERE id_wallet = OLD.id_wallet;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the update_wallet_saldo_on_income_delete function before a DELETE on the income table
CREATE TRIGGER update_wallet_saldo_on_income_delete_trigger
BEFORE DELETE ON income
FOR EACH ROW
EXECUTE FUNCTION update_wallet_saldo_on_income_delete();
